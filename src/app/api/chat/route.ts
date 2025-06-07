import { google } from '@ai-sdk/google';
import { convertToModelMessages, streamText, UIMessage } from 'ai';

const FlashModel = 'gemini-2.5-flash-preview-05-20';

export async function POST(request: Request) {
  const { messages }: { messages: UIMessage[] } = await request.json();

  const result = streamText({
    model: google(FlashModel),
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
