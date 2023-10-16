declare interface CommonEnv {
  NODE_ENV: 'production' | 'development' | 'local' | 'test';
}

declare interface FastifyEnv {
  FASTIFY_HOST?: string;
  FASTIFY_PORT?: string;
  FASTIFY_BACKLOG?: string;
}

declare interface PostgresEnv {
  POSTGRES_HOST?: string;
  POSTGRES_PORT?: string;
  POSTGRES_USERNAME?: string;
  POSTGRES_PASSWORD?: string;
  POSTGRES_DATABASE?: string;
}

declare interface JWTEnv {
  JWT_SECRET_KEY?: string;
}

declare module NodeJS {
  type ProcessEnv = CommonEnv & FastifyEnv & PostgresEnv & JWTEnv;
}
