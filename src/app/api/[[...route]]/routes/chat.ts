import { google } from '@ai-sdk/google';
import { convertToModelMessages, streamText } from 'ai';
import { Hono } from 'hono';
import { getChatById, saveChat } from '@/db/queries';
import { saveMessages } from '@/db/queries/message';
import { generateTitle } from '../actions';

export const chatRoute = new Hono();

const userId = 'test-user-id';

chatRoute.post('/', async (c) => {
  const {
    messages: uiMessages,
    model,
    id: chatId,
    type: chatType,
  } = await c.req.json();
  const currentUserMessage = uiMessages.at(-1);
  const currentChat = await getChatById({ id: chatId });

  if (!currentChat) {
    const { title } = await generateTitle(currentUserMessage.parts[0].text);
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
  const result = streamText({
    model: google(model.modelKey),
    messages: convertToModelMessages(uiMessages),
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
              type: 'file',
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
});
