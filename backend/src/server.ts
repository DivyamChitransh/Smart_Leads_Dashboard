import type { Server } from 'http';
import { createApp } from './app';
import { env } from './config/env';
import { connectDatabase, disconnectDatabase } from './config/database';

let server: Server | undefined;

const startServer = async (): Promise<void> => {
  await connectDatabase();
  const app = createApp();
  server = app.listen(env.PORT);
};

const shutdown = async () => {
  if (!server) {
    process.exit(0);
    return;
  }
  server.close(async () => {
    await disconnectDatabase();
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10_000).unref();
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  process.exit(1);
});

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
