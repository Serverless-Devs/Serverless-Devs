import { Command } from 'commander';
import chalk from 'chalk';
import * as core from '@serverless-devs/core';
import { emoji, getUid, writeOutput } from '@/utils';
import { includes, isEmpty, isPlainObject, isString } from 'lodash';
import logger from '@/logger';
import path from 'path';
import execDaemon from '@/exec-daemon';
import { EReportType } from '@/type';
import { DevsError, ETrackerType, getUserAgent, parseArgv } from '@serverless-devs/utils';
import handleError from '@/error';

const v1 = (program: Command) => {
  program.action(async options => {
    await doAction(options);
  });

  const doAction = async options => {
    const argv = process.argv.slice(2);
    const argvData = core.getGlobalArgs(argv);
    const { _: rawData, access = 'default', help, silent } = argvData;
    // s cli
    if (rawData.length === 1 || (rawData.length === 1 && help)) {
      program.help();
    }
    const [componentName, method] = rawData.slice(1);
    const instance = await core.loadComponent(componentName);

    async function getCurentCredential(access: string) {
      if (access === core.ALIYUN_CLI) {
        return await core.getCredential(access);
      }
      return await getCredentialWithExisted(access);
    }

    async function execComponent(_method) {
      const credentials = await getCurentCredential(access);
      let tempProp = {};
      try {
        const p = argvData.props || argvData.p;
        tempProp = p ? JSON.parse(p) : {};
      } catch (e) {
        throw new Error('-p/--props parameter format error');
      }
      const argsObj = rawData
        .slice(3)
        .filter(o => !includes(argvData._argsObj, o))
        .concat(argvData._argsObj);
      const inputs = {
        props: tempProp,
        credentials: credentials || {},
        appName: 'default',
        project: {
          component: componentName,
          access,
          projectName: 'default',
          provider: undefined,
        },
        command: _method,
        args: argsObj.join(' '),
        argsObj,
        path: {
          configPath: process.cwd(),
        },
      };
      const reportData = { uid: await getUid(access), argv, command: _method, component: componentName, userAgent: getUserAgent({ component: componentName }) };
      try {
        const res = await instance[_method](inputs);
        if (isEmpty(res)) {
          return logger.write(chalk.green(`End of method: ${_method}`));
        }
        const showOutput = () => {
          const argv = parseArgv(process.argv.slice(2));
          if (argv['output-file']) return;
          logger.unsilent();
          isString(res) ? (silent ? logger.write(res) : logger.write(chalk.green(res))) : logger.output(res);
          if (silent) logger.silent();
        };
        showOutput();
        writeOutput(res);
        execDaemon('report.js', { ...reportData, type: EReportType.command });
      } catch (error) {
        handleError(
          new DevsError(error.message, {
            stack: error.stack,
            exitCode: 101,
            trackerType: ETrackerType.runtimeException,
          }),
          reportData,
        );
        return;
      }
    }
    // s cli fc -h
    if (rawData.length === 2) {
      if (instance['index']) {
        return await execComponent('index');
      }
      const publishPath = path.join(instance.__path, 'publish.yml');
      await specifyServiceHelp(publishPath);
      return;
    }
    // s cli fc api ListServices
    if (rawData.length >= 3) {
      if (instance[method]) {
        return await execComponent(method);
      }
      throw new utils.DevsError('The specified command cannot be found.', {
        exitCode: 100,
        tips: 'Please refer to the help document of [-h/--help] command.',
      });
    }
  };
};

const getCredentialWithExisted = async (access: string) => {
  const data = await core.getCredentialAliasList();
  if (includes(data, access)) {
    const info = await core.getCredential(access);
    return info;
  }
};

async function specifyServiceHelp(filePath: string) {
  const publishYamlInfor = await core.getYamlContent(filePath);
  logger.write(`\n  ${emoji('🚀')} ${publishYamlInfor['Name']}@${publishYamlInfor['Version']}: ${publishYamlInfor['Description']}\n`);
  const commands = publishYamlInfor['Commands'];
  if (commands) {
    const maxLength = core.publishHelp.maxLen(commands);
    let tmp = [];
    const newObj = {};
    for (const key in commands) {
      const ele = commands[key];
      isPlainObject(ele) ? tmp.push(core.publishHelp.helpInfo(ele, chalk.underline(chalk.bold(key)), maxLength, 4)) : (newObj[key] = ele);
    }
    tmp.length > 0 && logger.write(tmp.join('\n'));
    if (!isEmpty(newObj)) {
      for (const key in newObj) {
        logger.write(`    ${getTempCommandStr(key, maxLength)} ${newObj[key]}`);
      }
      logger.write('');
    }
    logger.write(publishYamlInfor['HomePage'] ? `  ${emoji('🧭')} ${core.makeUnderLine('More information: ' + publishYamlInfor['HomePage'])} ` + '\n' : '');
  }
  function getTempCommandStr(commands: string, length: number) {
    const commandsLength = commands.length;
    const tempArray = new Array(length - commandsLength).fill(' ');
    return `${commands}${tempArray.join('')} : `;
  }
}

export default v1;
