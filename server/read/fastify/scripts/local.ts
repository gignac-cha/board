import { configDotenv } from 'dotenv';
import { existsSync } from 'fs';
import { resolve } from 'path';

const path = `${resolve()}/.env.${process.env.NODE_ENV}`;

if (!existsSync(path)) {
  throw new Error(`File not exists: ${path}`);
}

configDotenv({ path });

import '../src/server';
