import fastifyCors from '@fastify/cors';
import fastify, { FastifyInstance } from 'fastify';
import { indexRoute } from './routes';
import { apiRoute } from './routes/api';
import { fastifyConfiguration } from './utilities/configuration';
import { fastifyDataSource } from './utilities/database';

const server: FastifyInstance = fastify({ logger: true });

Promise.resolve().then(async () => {
  await server.register(fastifyCors);

  await server.register(fastifyConfiguration);

  await server.register(fastifyDataSource);
  await server.dataSource.initialize();

  await server.register(indexRoute, { prefix: '/' });

  await server.register(apiRoute, { prefix: '/api' });

  server.addHook('onClose', async () => {
    await server.dataSource.destroy();
  });

  await server.listen({ ...server.configuration.fastify });
});
