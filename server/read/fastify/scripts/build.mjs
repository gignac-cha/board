import { build } from 'esbuild';
import { resolveDecoratorFromTSConfig } from '../plugins/resolveDecoratorFromTSConfig.mjs';

build({
  entryPoints: ['src/server.ts'],
  outfile: 'dist/server.js',
  platform: 'node',
  target: 'node20',
  bundle: true,
  minify: true,
  external: ['pg-native'],
  plugins: [resolveDecoratorFromTSConfig()],
});
