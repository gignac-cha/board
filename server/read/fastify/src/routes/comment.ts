import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import { Comment } from '../entities/Comment';
import { CommentReadData } from '../models/CommentReadData';

export const commentRoute = async (
  instance: FastifyInstance,
  opts: FastifyPluginOptions,
  done: (err?: Error | undefined) => void,
) => {
  instance.get(
    '',
    async (
      request: FastifyRequest<{
        Params: { boardUUID: string; articleUUID: string };
      }>,
      reply: FastifyReply,
    ) => {
      const { articleUUID } = request.params;
      const _comments = await instance.dataSource.getRepository(Comment).find({
        relations: ['article'],
        where: { article: { uuid: articleUUID }, deleted: false },
      });
      if (!_comments) {
        return reply.send({ success: false, comments: [] });
      }
      const comments = _comments.map(
        (comment: Comment) => new CommentReadData(comment),
      );
      await Promise.all(
        comments.map((comment: CommentReadData) => comment.lazyFill()),
      );
      comments.sort((a: CommentReadData, b: CommentReadData) =>
        a.createdAt < b.createdAt ? -1 : 1,
      );
      reply.send({ success: true, comments });
    },
  );
  instance.get(
    '/:uuid',
    async (
      request: FastifyRequest<{
        Params: { boardUUID: string; articleUUID: string; uuid: string };
      }>,
      reply: FastifyReply,
    ) => {
      const { articleUUID, uuid } = request.params;
      const _comment = await instance.dataSource
        .getRepository(Comment)
        .findOne({
          relations: ['article'],
          where: { article: { uuid: articleUUID }, uuid },
        });
      if (!_comment) {
        return reply.send({ success: false });
      }
      const comment = new CommentReadData(_comment);
      await comment.lazyFill();
      reply.send({ success: true, comment });
    },
  );
  done();
};
