import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import fastify from 'fastify';
import { FastifyAdapter } from '@bull-board/fastify';
import Redis from 'ioredis';
import { Queue } from 'bullmq';
import { BULL_BOARD_CONFIG, REDIS_CONFIG } from './config';

const getQueues = async (): Promise<BullMQAdapter[]> => {
  const redis = new Redis(REDIS_CONFIG.connection);
  const keys = await redis.keys(`${BULL_BOARD_CONFIG.prefix}:*`);

  redis.disconnect();

  const queueNames = new Set(
    keys.map((key) => key.replace(/^.+?:(.+?):.+?$/, '$1')),
  );

  const queues = Array.from(queueNames).map(
    (queue) => new BullMQAdapter(new Queue(queue, REDIS_CONFIG)),
  );

  return queues;
};

const run = async () => {
  const { port, appRoot } = BULL_BOARD_CONFIG;

  const server = fastify();

  const serverAdapter = new FastifyAdapter();

  serverAdapter.setBasePath(appRoot);

  server.register(serverAdapter.registerPlugin(), {
    basePath: '/',
    prefix: appRoot,
  });

  const queues: BullMQAdapter[] = await getQueues();

  createBullBoard({
    queues,
    serverAdapter,
  });

  await server.listen(port, '0.0.0.0');

  console.info(`🚀 Running on ${port}...`);
  console.info(`🎯 Dashboard: http://localhost:${port}/ui`);
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
