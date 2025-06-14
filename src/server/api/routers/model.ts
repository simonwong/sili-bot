import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';

export const modelRouter = createTRPCRouter({
  list: publicProcedure.query(() => {
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
