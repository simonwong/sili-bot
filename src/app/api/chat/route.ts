import { google } from '@ai-sdk/google';
import { convertToModelMessages, streamText, UIMessage } from 'ai';

export async function POST(request: Request) {
  const {
    messages,
    model,
  }: {
    messages: UIMessage[];
    model: {
      provider: string;
      modelKey: string;
    } | null;
    id: string;
  } = await request.json();

  if (!model) {
    return new Response('Model is required', { status: 400 });
  }

  const result = streamText({
    model: google(model.modelKey),
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
