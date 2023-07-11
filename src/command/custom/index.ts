import { Command } from 'commander';
import Engine, { IContext } from '@serverless-devs/engine';
import { parseArgv } from '@serverless-devs/utils';
import { get, isEmpty, each } from 'lodash';
import ParseSpec, { IOutput } from '@serverless-devs/parse-spec';
import V1 from './v1';
import logger from '../../logger';
import yaml from 'js-yaml';
import { HandleError } from '../../error';
import { ISpec } from './types';
import Help from './help';


export default class Custom {
  private spec = {} as ISpec;
  constructor(private program: Command) { }
  async init() {
    const argv = process.argv.slice(2);
    const { _: raw, template, help } = parseArgv(argv);
    // 工具内置命令不处理
    const systemCommandNames = this.program.commands.map(command => command.name());
    if (systemCommandNames.includes(raw[0])) return;
    // help命令不处理
    if (raw[0] === 'help') return;
    this.spec = this.parseSpec();
    if (isEmpty(this.spec)) return;
    if (!get(this.spec, 'yaml.use3x')) return await new V1(this.program, this.spec).init();
    if (help) return await new Help(this.program, this.spec).init();
    this.program.command(raw[0]).action(async () => {
      const engine = new Engine({
        template,
        logConfig: {
          customLogger: logger.loggerInstance,
        }
      });
      const context = await engine.start();
      this.output(context);
      logger.loggerInstance.__clear();
    })
  }
  output(context: IContext) {
    if (get(context, 'status') === 'success') {
      const data = get(context, 'output', {})
      const argv = process.argv.slice(2);
      const { output = 'default' } = parseArgv(argv);
      if (output === IOutput.JSON) {
        return logger.log(JSON.stringify(data, null, 2));
      }
      if (output === IOutput.RAW) {
        return logger.log(JSON.stringify(data));
      }
      if (output === IOutput.YAML) {
        return logger.log(yaml.dump(data));
      }
      return logger.output(data);
    }
    HandleError(context.error);
  }
  parseSpec() {
    try {
      const argv = process.argv.slice(2);
      const { template } = parseArgv(argv);
      const spec = new ParseSpec(template, argv).start();
      const components = new Set<string>();
      each(get(spec, 'steps', []), item => {
        components.add(item.component);
      })
      return { ...spec, components: Array.from(components) }
    } catch (error) {
      return {} as ISpec;
    }
  }
}
