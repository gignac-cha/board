import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import { Article } from '../entities/Article';
import { ArticleReadData } from '../models/ArticleReadData';
import { ArticleSimpleReadData } from '../models/ArticleSimpleReadData';

export const articleRoute = async (
  instance: FastifyInstance,
  opts: FastifyPluginOptions,
  done: (err?: Error | undefined) => void,
) => {
  instance.get(
    '',
    async (
      request: FastifyRequest<{ Params: { boardUUID: string } }>,
      reply: FastifyReply,
    ) => {
      const { boardUUID } = request.params;
      const _articles = await instance.dataSource
        .getRepository(Article)
        .find({ relations: ['board'], where: { board: { uuid: boardUUID } } });
      if (!_articles) {
        return reply.send({ success: false, articles: [] });
      }
      const articles = _articles.map(
        (article: Article) => new ArticleSimpleReadData(article),
      );
      await Promise.all(
        articles.map((article: ArticleSimpleReadData) => article.lazyFill()),
      );
      articles.sort((a: ArticleSimpleReadData, b: ArticleSimpleReadData) =>
        a.createdAt > b.createdAt ? -1 : 1,
      );
      reply.send({ success: true, articles });
    },
  );
  instance.get(
    '/:uuid',
    async (
      request: FastifyRequest<{
        Params: { boardUUID: string; uuid: string };
      }>,
      reply: FastifyReply,
    ) => {
      const { boardUUID, uuid } = request.params;
      const _article = await instance.dataSource
        .getRepository(Article)
        .findOne({
          relations: ['board'],
          where: { board: { uuid: boardUUID }, uuid },
        });
      if (!_article) {
        return reply.send({ success: false });
      }
      const article = new ArticleReadData(_article);
      await article.lazyFill();
      reply.send({ success: true, article });
    },
  );
  done();
};
