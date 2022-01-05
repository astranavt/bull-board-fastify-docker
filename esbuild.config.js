/* eslint-disable @typescript-eslint/no-var-requires */
const esbuild = require('esbuild');

// Automatically exclude all node_modules from the bundled version
const { nodeExternalsPlugin } = require('esbuild-node-externals');

const config = {
  entryPoints: ['./src/index.ts'],
  outdir: 'dist',
  bundle: true,
  minify: true,
  platform: 'node',
  sourcemap: false,
  target: 'node16',
  plugins: [nodeExternalsPlugin()],
};

esbuild.build(config).catch(() => process.exit(1));
