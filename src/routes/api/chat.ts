import { google } from '@ai-sdk/google';
import { createFileRoute } from '@tanstack/react-router';
import { convertToModelMessages, generateText, streamText } from 'ai';
import { getChatById, saveChat } from '@/db/queries';
import { saveMessages } from '@/db/queries/message';

export const generateTitle = async (
  message: string
): Promise<{
  title: string;
}> => {
  try {
    const result = await generateText({
      model: google('gemini-2.5-flash-preview-05-20'),
      prompt: `Based on this first message from a user, generate a concise, descriptive title for the conversation (max 6 words, no quotes):

User message: "${message}"

Title:`,
      maxRetries: 2,
    });

    // Clean up the generated title - remove quotes and extra whitespace
    const title = result.text
      .replace(/["'`]/g, '')
      .replace(/^title:\s*/i, '')
      .trim();

    return { title: title || 'New Conversation' };
  } catch (_error) {
    return { title: 'New Conversation' };
  }
};

const userId = 'test-user-id';

export const Route = createFileRoute('/api/chat')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const {
          messages: uiMessages,
          model,
          id: chatId,
          type: chatType,
        } = await request.json();
        const currentUserMessage = uiMessages.at(-1);
        if (!currentUserMessage || currentUserMessage.role !== 'user') {
          return Response.json(
            { message: 'Invalid chat payload: missing latest user message' },
            { status: 400 }
          );
        }

        const firstTextPart = currentUserMessage.parts.find(
          (part: { type: string; text?: string }) => part.type === 'text'
        );
        const firstMessageText = firstTextPart?.text ?? 'New Conversation';
        const currentChatPromise = getChatById({ id: chatId });
        const titlePromise = generateTitle(firstMessageText);
        const currentChat = await currentChatPromise;

        if (!currentChat) {
          const { title } = await titlePromise;
          await saveChat({ id: chatId, title, userId });
        }

        await saveMessages([
          {
            chatId,
            id: currentUserMessage.id,
            role: 'user',
            parts: currentUserMessage.parts,
          },
        ]);

        const modelMessages = await convertToModelMessages(uiMessages);
        const result = streamText({
          model: google(model.modelKey),
          messages: modelMessages,
          providerOptions: {
            google:
              chatType === 'chat'
                ? {
                    thinkingConfig: {
                      includeThoughts: true,
                      thinkingBudget: -1,
                    },
                  }
                : {},
          },
          onFinish: async ({ text, reasoning, files }) => {
            await saveMessages([
              {
                role: 'assistant',
                parts: [
                  ...reasoning,
                  { type: 'text', text },
                  ...(files?.map((file) => ({
                    type: 'file' as const,
                    mediaType: file.mediaType,
                    // @ts-expect-error
                    filename: file.filename,
                    url: `data:${file.mediaType};base64,${file.base64}`,
                  })) || []),
                ],
                chatId,
              },
            ]);
          },
        });

        return result.toUIMessageStreamResponse();
      },
    },
  },
});
