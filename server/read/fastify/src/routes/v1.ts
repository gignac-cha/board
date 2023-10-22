import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { articleRoute } from './article';
import { boardRoute } from './board';
import { userRoute } from './user';
import { commentRoute } from './comment';

export const v1Route = async (
  instance: FastifyInstance,
  opts: FastifyPluginOptions,
  done: (err?: Error | undefined) => void,
) => {
  await instance.register(userRoute, { prefix: '/users' });
  await instance.register(boardRoute, { prefix: '/boards' });
  await instance.register(articleRoute, {
    prefix: '/boards/:boardUUID/articles',
  });
  await instance.register(commentRoute, {
    prefix: '/boards/:boardUUID/articles/:articleUUID/comments',
  });
  done();
};
