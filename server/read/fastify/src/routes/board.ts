import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import { Board } from '../entities/Board';
import { BoardReadData } from '../models/BoardReadData';
import { BoardSimpleReadData } from '../models/BoardSimpleReadData';

export const boardRoute = async (
  instance: FastifyInstance,
  opts: FastifyPluginOptions,
  done: (err?: Error | undefined) => void,
) => {
  instance.get('', async (request: FastifyRequest, reply: FastifyReply) => {
    const _boards = await instance.dataSource.getRepository(Board).find();
    if (!_boards) {
      reply.send({ success: false, boards: [] });
    }
    const boards = _boards.map(
      (board: Board) => new BoardSimpleReadData(board),
    );
    reply.send({ success: true, boards });
  });
  instance.get(
    '/:uuid',
    async (
      request: FastifyRequest<{ Params: { uuid: string } }>,
      reply: FastifyReply,
    ) => {
      const { uuid } = request.params;
      const _board = await instance.dataSource
        .getRepository(Board)
        .findOne({ where: { uuid } });
      if (!_board) {
        return reply.send({ success: false });
      }
      const board = new BoardReadData(_board);
      reply.send({ success: true, board });
    },
  );
  done();
};
