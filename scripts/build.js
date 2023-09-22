const esbuild = require('esbuild');
const fs = require('fs-extra');
const path = require('path');
const utils = require('@serverless-devs/utils');

(async () => {
  await fs.remove('lib');
  fs.ensureDirSync('lib');
  fs.copySync('src/daemon', 'lib/daemon')
  const { watch } = utils.parseArgv(process.argv.slice(2));

  const options = [
    {
      entryPoints: 'src/index.ts',
      outfile: 'lib/index.js',
    },
    {
      entryPoints: 'src/daemon-lib/index.ts',
      outfile: 'lib/daemon/lib.js'
    }
  ];

  for (const item of options) {
    const context = await esbuild.context({
      entryPoints: [item.entryPoints],
      bundle: true,
      logLevel: 'error',
      minify: true,
      platform: 'node',
      format: 'cjs',
      target: 'node12',
      outfile: item.outfile,
      alias: {
        '@': path.resolve('src'),
      },
    })
    // 只 watch 主流程的文件
    if (watch) {
      console.log('watching...')
      await context.watch();
      break;
    }
    await context.rebuild();
    console.log(`build ${item.entryPoints} to ${item.outfile} successfully\n`)
    context.dispose();
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
