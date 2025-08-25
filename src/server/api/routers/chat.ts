import { google } from '@ai-sdk/google';
import { convertToModelMessages, streamText, type UIMessage } from 'ai';
import z from 'zod';
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';

export const chatRouter = createTRPCRouter({
  chat: publicProcedure
    .input(
      z.object({
        messages: z.custom<UIMessage[]>(),
        model: z
          .object({
            provider: z.string(),
            modelKey: z.string(),
          })
          .nullable(),
        id: z.string(),
      })
    )
    .query(() => {
      return [
        {
          provider: 'Gemini',
          models: [
            {
              modelKey: 'gemini-2.5-flash-preview-05-20',
              modelName: 'Gemini 2.5 Flash Preview',
            },
            {
              modelKey: 'gemini-2.5-pro-preview-06-05',
              modelName: 'Gemini 2.5 Pro Preview',
            },
          ],
        },
      ];
    }),
});

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
