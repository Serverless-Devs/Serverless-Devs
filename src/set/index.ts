import program from 'commander';
import { emoji } from '../utils/common';

const description = `You can make some default settings for the tool here.

📖 Document: https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/set.md`;

program
  .name('s set')
  .usage('[commands] [options]')
  .command('registry', `${emoji('👀')} Set up a custom registry`)
  .command('locale', `${emoji('🔧')} Set up current language`)
  .command('analysis', `${emoji('👉')} Set to enable or disable analysis`)
  .helpOption('-h, --help', 'Display help for command')
  .addHelpCommand(false)
  .description(description)
  .parse(process.argv);
