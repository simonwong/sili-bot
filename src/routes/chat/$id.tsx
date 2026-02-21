import { createFileRoute } from '@tanstack/react-router';
// import { getMessagesByChatId } from '@/db/queries/message';

// 找到了;
// ，Buffer 不是你在 src/ 里直接写的，而是依赖包里用到的 Node API。

//   - node_modules/.vite/deps/chunk-Z3BFMHQP.js:627 有 Buffer.allocUnsafe(...)
//   - node_modules/.vite/deps/chunk-Z3BFMHQP.js:645 有 Buffer.byteLength(...)
//   - node_modules/.vite/deps/chunk-Z3BFMHQP.js:673 有 Buffer.concat(...)

//   这个 chunk 里注释指向来源是 postgres 包的 src/bytes.js。

//   它会被打进前端的链路是：

//   - src/db/index.ts:2
// import postgres from 'postgres';
// -src / db / index.ts;
// :1
// import { drizzle } from 'drizzle-orm/postgres-js';
// -src / routes / chat / $id.tsx;
// :2 直接引了
// @/db/queries
// /  BDaeegmss了代带把由码路路进链（;
// bundle;
// ）

//   所以根因基本是：前端可执行路由文件里间接引入了服务端 DB 驱动。
//   如果你要，我可以直接帮你改成纯服务端调用（API route / server
// function
// ）来消掉这个报
//   错。

export const Route = createFileRoute('/chat/$id')({
  component: ChatPage,
  loader: async ({ params }) => {
    // const { messages } = await getMessagesByChatId({ chatId: params.id });
    // console.log('messages', messages);
    return {
      messages: [],
    };
  },
});
function ChatPage() {
  // const { id } = Route.useParams();
  // const messages = Route.useLoaderData();
  // console.log('id', id);
  // console.log('messages', messages);
  // return (
  //   <div className={cn('flex h-screen max-h-screen flex-1 flex-col')}>
  //     <div className='flex items-center gap-2 px-4 py-2'>
  //       <SidebarTrigger />
  //       <ModelSelect />
  //     </div>
  //     {/* <Chat id={id} initialMessages={messages} /> */}
  //   </div>
  // );

  return <div>Chat</div>;
}
