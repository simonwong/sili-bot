import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { chatRoute, historyRoute, messagesRoute } from './routes';

export const dynamic = 'force-dynamic';

export const config = {
  runtime: 'edge',
};

const app = new Hono().basePath('/api');

// 注册各个路由模块
app.route('/chat', chatRoute);
app.route('/history', historyRoute);
app.route('/messages', messagesRoute);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);