import {
  FastifyInstance,
  FastifyListenOptions,
  FastifyPluginOptions,
} from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions.js';

interface JWTConfiguration {
  secretKey: string;
}

interface Configuration {
  fastify: FastifyListenOptions;
  postgres: PostgresConnectionOptions;
  jwt: JWTConfiguration;
}

declare module 'fastify' {
  interface FastifyInstance {
    configuration: Configuration;
  }
}

const getConfiguration = (): Configuration => {
  return {
    fastify: {
      host: process.env.FASTIFY_HOST,
      port: parseInt(process.env.FASTIFY_PORT ?? '0'),
      backlog: parseInt(process.env.FASTIFY_BACKLOG ?? '0'),
    },
    postgres: {
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT ?? '0'),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
    },
    jwt: {
      secretKey: process.env.JWT_SECRET_KEY ?? 'invalid-secret-key',
    },
  };
};

export const fastifyConfiguration = fastifyPlugin(
  (
    instance: FastifyInstance,
    otps: FastifyPluginOptions,
    done: (err?: Error | undefined) => void,
  ) => {
    instance.decorate('configuration', getConfiguration());
    done();
  },
);
