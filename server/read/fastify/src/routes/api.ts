import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { v1Route } from './v1';

export const apiRoute = async (
  instance: FastifyInstance,
  opts: FastifyPluginOptions,
  done: (err?: Error | undefined) => void,
) => {
  await instance.register(v1Route, { prefix: '/v1' });
  done();
};
