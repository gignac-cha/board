import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';

export const indexRoute = async (
  instance: FastifyInstance,
  opts: FastifyPluginOptions,
  done: (err?: Error | undefined) => void,
) => {
  instance.all('', (request: FastifyRequest, reply: FastifyReply) => {
    reply.send({ success: true, now: new Date().toUTCString() });
  });
  done();
};
