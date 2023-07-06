import { Command } from 'commander';
import Engine from '@serverless-devs/engine';
import { parseArgv } from '@serverless-devs/utils';
import loadComponent from '@serverless-devs/load-component';
import { get } from 'lodash';
import ParseSpec from '@serverless-devs/parse-spec';
import logger from '../../logger';

interface IStep {
  projectName: string;
  component: string;
}

interface IParseSpecResult {
  method?: string;
  steps: IStep[];
  components: string[];
}

export default class Custom {
  constructor(private program: Command) {}

  async init() {
    // ****** 解析参数 ****** //
    const argv = process.argv.slice(2);
    const {
      _: [projectName, customCommand],
      template = '/Users/wss/Desktop/3.0/dev-toolkit/packages/engine/__tests__/mock/flow.yaml',
      help,
    } = parseArgv(argv);

    // ****** 判断是否处理自定义指令 ****** //
    // 系统命令不处理，避免覆盖系统命令
    const systemCommandNames = this.program.commands.map(command => command.name());
    if (projectName === 'help' || systemCommandNames.includes(projectName)) {
      return;
    }
    // 如果没有运行子命令，不需要解析；但如果是 s --help 需要解析并追加 s.yaml 的 help 信息
    if (!projectName && !help) {
      return;
    }
    logger.debug(`Need handle custom command, arg1: ${projectName}, arg2: ${customCommand}`);

    // ****** 解析 yaml ****** //
    const isSHelp = !projectName && help; // 没有自定义命令，但是存在 help
    const { method, steps, components } = await this.parseSpec(template, isSHelp);
    logger.debug(`Run parse need load components: ${components}`);
    logger.debug(`Run parse spec method: ${method}`);
    logger.debug(`Run parse spec steps: ${JSON.stringify(steps)}`);

    // ****** 追加自定义指令和参数 ****** //
    let customProgram;
    // 非 s --help 的情况
    if (method || projectName) {
      // 运行 s <project> --help; 此时 steps 长度有且应该为 1
      if (!method) {
        customProgram = this.program.command(projectName).allowUnknownOption();
        await this.singleComponent(projectName, steps[0].component, customProgram);

        // 运行 s <project> <command> 如果运行命令和二级指令不相同，则认为是指定了，例如：
        // s abc deploy 解析 method 是 deploy, abc 则为 yaml 配置的 project; 此时 steps 长度有且应该为 1
      } else if (method !== projectName) {
        logger.debug('Handle appoint project name');
        const projectProgram = this.program.command(projectName);
        customProgram = projectProgram.command(method).allowUnknownOption();
        await this.singleComponent(projectName, steps[0].component, customProgram);
        // s deploy <subcommand>
      } else {
        customProgram = this.program.command(method).allowUnknownOption();
        await this.multipleComponent(components, steps, customProgram);
      }

      // ****** 调用 engine ****** //
      customProgram.action(async () => {
        // TODO: 指定之后是否还需要找 s yaml

        try {
          const engine = new Engine({
            template,
            logConfig: {
              customLogger: logger.loggerInstance,
            }
          });
  
          const context = await engine.start();
          logger.output(context);

          logger.loggerInstance.__clear();
        } catch (ex) {
          logger.loggerInstance.__clear();
          throw ex;
        }
      });

      return;
    }

    // 仅配置有一个组件
    if (components.length === 1) {
      const { component } = steps[0];
      return this.singleComponent('<projectName>', component);
    }

    // s --help
    const helpArray = steps.map(
      ({ projectName }) =>
        `${projectName} [options]          Please use [s ${projectName} -h]  obtain the documentation.`,
    );

    return `Custom Commands
  ${helpArray.join('\n  ')}
`;
  }

  // 多组件处理 help
  async multipleComponent(components: string[], steps: IStep[], customProgram: Command): Promise<void> {
    if (components.length === 1) {
      const { projectName, component } = steps[0];
      await this.singleComponent(projectName, component, customProgram);
      return;
    }

    logger.debug('Need handle multiple component');

    // 过滤重复的 component
    const customHelp = {};
    for (const { projectName, component } of steps) {
      const instance = await loadComponent(component);
      if (customHelp[component]) {
        customHelp[component].project.push(projectName);
        continue;
      }
      customHelp[component] = {
        project: [projectName],
        help: `TODO: ${instance.help}`,
      };
    }

    customProgram.helpInformation = () => {
      let helpString = '';
      for (const key in customHelp) {
        const { project, help } = customHelp[key];
        helpString += `${project.join('/')}\n${help}`;
      }
      return helpString;
    };
  }

  // 单组件需要输出 help 信息
  async singleComponent(projectName: string, component: string, customProgram?: Command): Promise<string> {
    logger.debug('Need handle single component');
    const instance = await loadComponent(component);

    instance.help?.();

    // TODO: 新增 help  依赖 组件抛出的 command 规范
    if (customProgram) {
      customProgram.addHelpText('after', 'TODO: xxxx');
    }

    return `
Custom Commands
  TODO: ${projectName} help:
  ${component}.method help
`;
  }

  async parseSpec(template: string, isSHelp: boolean): Promise<IParseSpecResult> {
    logger.debug(`template: ${template}`);
    logger.debug(`isSHelp: ${isSHelp}`);
    let result: any;

    try {
      const parseSpec = new ParseSpec(template);
      result = parseSpec.start();
    } catch (ex) {
      // s --help 时 yaml不存在 以外都需要报错
      if (isSHelp && ex.message === 'yaml不存在') {
        logger.error(`Run parse spec error: ${ex.message}`);
      } else {
        throw ex;
      }
    }

    const components = new Set<string>();
    const steps = get(result, 'steps', []).map(item => {
      components.add(item.component);
      return {
        projectName: item.projectName,
        component: item.component,
      };
    });
    const method = get(result, 'method');

    return { method, steps, components: Array.from(components) };
  }
}
