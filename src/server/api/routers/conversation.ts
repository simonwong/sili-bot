import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';

export const conversationRouter = createTRPCRouter({
  list: publicProcedure.query(() => {
    return [
      {
        title: 'MarkdownConversation',
        id: 'markdown-conversation-vomwerjweasm',
      },
      {
        title: 'EasyChat',
        id: 'easy-chat-asdnmownwrwe',
      },
    ];
  }),
});
