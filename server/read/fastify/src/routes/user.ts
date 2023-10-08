import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import { verify } from 'jsonwebtoken';
import { User } from '../entities/User';
import { UserReadData } from '../models/UserReadData.ts';

export const userRoute = async (
  instance: FastifyInstance,
  opts: FastifyPluginOptions,
  done: (err?: Error | undefined) => void,
) => {
  instance.get(
    '/me',
    async (
      request: FastifyRequest<{ Params: { uuid: string } }>,
      reply: FastifyReply,
    ) => {
      const { authorization } = request.headers;
      if (!authorization) {
        return { success: false };
      }
      const requestToken = authorization.replace('Bearer ', '');
      try {
        const payload = verify(
          requestToken,
          instance.configuration.jwt.secretKey,
          {
            complete: false,
          },
        );
        if (!payload || typeof payload === 'string') {
          return { success: false };
        }
        const uuid = payload['uuid'];
        const _user = await instance.dataSource
          .getRepository(User)
          .findOne({ where: { uuid } });
        if (!_user) {
          return reply.send({ success: false });
        }
        const user = new UserReadData(_user);
        reply.send({ success: true, user });
      } catch (error) {
        return { success: false };
      }
    },
  );
  instance.get(
    '/:uuid',
    async (
      request: FastifyRequest<{ Params: { uuid: string } }>,
      reply: FastifyReply,
    ) => {
      const { uuid } = request.params;
      const _user = await instance.dataSource
        .getRepository(User)
        .findOne({ where: { uuid } });
      if (!_user) {
        return reply.send({ success: false });
      }
      const user = new UserReadData(_user);
      reply.send({ success: true, user });
    },
  );
  done();
};
