import { Command } from 'commander';

const program = new Command();

program
  .name('s-cli')
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0');

program.parse(process.argv);
