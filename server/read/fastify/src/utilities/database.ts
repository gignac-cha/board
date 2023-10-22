import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { DataSource } from 'typeorm';
import { Article } from '../entities/Article';
import { Board } from '../entities/Board';
import { Comment } from '../entities/Comment';
import { User } from '../entities/User';

declare module 'fastify' {
  interface FastifyInstance {
    dataSource: DataSource;
  }
}

const getDataSource = (instance: FastifyInstance) => {
  return new DataSource({
    ...instance.configuration.postgres,
    entities: [User, Board, Article, Comment],
    synchronize: false,
    logging: true,
  });
};

export const fastifyDataSource = fastifyPlugin(
  (
    instance: FastifyInstance,
    otps: FastifyPluginOptions,
    done: (err?: Error | undefined) => void,
  ) => {
    instance.decorate('dataSource', getDataSource(instance));
    done();
  },
);
