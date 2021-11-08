import program from 'commander';
import core from '../utils/core';
import i18n from '../utils/i18n';
import os from 'os';
import path from 'path';
import logger from '../utils/logger';
import { getFolderSize } from '../utils/common';
import { getConfig } from '../utils/handler-set-config';
import { emoji } from '../utils/common';

const Table = require('tty-table');

const { minimist, getYamlContent, fse: fs, colors } = core;

const description = `Get details of installed components.
    Example:
        $ s component
        $ s component --component fc-api

${emoji('📖')} Document: ${colors.underline(
  'https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/component.md',
)}`;
const command = program
  .name('s component')
  .usage('[options]')
  .option('--component [componentName]', 'Gets the specified component information (like: fc, fc@0.0.1)')
  .helpOption('-h, --help', i18n('display_help_for_command'))
  .description(description)
  .addHelpCommand(false)
  .parse(process.argv);

async function getComponent(filePath: string) {
  const data = await getYamlContent(path.join(filePath, 'publish.yaml'));
  if (data && data.Type === 'Component') {
    data.isComponent = true;
    return data;
  }
  return {
    isComponent: false,
  };
}

(async () => {
  const sPath = path.join(os.homedir(), '.s');
  const componentsPath = path.join(sPath, 'components');
  const devsappPath = path.join(componentsPath, 'devsapp.cn');
  const githubPath = path.join(componentsPath, 'github.com');
  if (process.argv.length === 2) {
    // 获取所有组件
    const options = {
      borderStyle: 'solid',
      borderColor: 'blue',
      headerAlign: 'center',
      align: 'center',
      headerColor: 'cyan',
      color: 'cyan',
      width: '100%',
      marginLeft: 0,
      marginTop: 0,
    };
    const header = [
      { alias: 'Component', width: '25%' },
      { alias: 'Description', width: '45%' },
      { alias: 'Size', width: '15%' },
      { alias: 'Version', width: '15%' },
    ];
    // s源
    if (fs.existsSync(devsappPath)) {
      const devsappDirs = fs.readdirSync(devsappPath);
      const serverlessRows = [];
      for (const fileName of devsappDirs) {
        if (fileName === 'devsapp') {
          const devsappSubPath = path.join(devsappPath, fileName);
          const devsappSubDirs = fs.readdirSync(devsappSubPath);
          for (const devsappFileName of devsappSubDirs) {
            const filePath = path.join(devsappSubPath, devsappFileName);
            const data = await getComponent(filePath);
            if (data.isComponent) {
              const size = await getFolderSize(filePath);
              serverlessRows.push([
                `${fileName}/${data.Name}`,
                data.Description,
                `${(size / 1000 / 1000).toFixed(2)} MB`,
                data.Version,
              ]);
            }
          }
        } else {
          const filePath = path.join(devsappPath, fileName);
          const data = await getComponent(filePath);
          if (data.isComponent) {
            const size = await getFolderSize(filePath);
            serverlessRows.push([data.Name, data.Description, `${(size / 1000 / 1000).toFixed(2)} MB`, data.Version]);
          }
        }
      }

      const serverlessOut = Table(header, serverlessRows, options).render();
      logger.log(`\n${emoji('🔎')} serverless registry [http://registry.devsapp.cn/simple] `);
      logger.log(serverlessOut);
    }
    // github源
    if (fs.existsSync(githubPath)) {
      const githubDirs = fs.readdirSync(githubPath);
      const githubRows = [];
      for (const fileName of githubDirs) {
        const githubSubPath = path.join(githubPath, fileName);
        const githubSubDirs = fs.readdirSync(githubSubPath);
        for (const githubFileName of githubSubDirs) {
          const filePath = path.join(githubSubPath, githubFileName);
          const data = await getComponent(filePath);
          if (data.isComponent) {
            const size = await getFolderSize(filePath);
            githubRows.push([
              `${fileName}/${data.Name}`,
              data.Description,
              `${(size / 1000 / 1000).toFixed(2)} MB`,
              data.Version,
            ]);
          }
        }
      }
      const githubOut = Table(header, githubRows, options).render();
      logger.log(`\n${emoji('🔎')} github registry [https://api.github.com/repos]`);
      logger.log(githubOut);
    }
    return;
  }
  if (process.argv.length > 2) {
    const args = minimist(process.argv.slice(2), {
      string: ['component'],
    });
    if (args.component) {
      const registry = getConfig('registry');
      // s 源
      if (registry === 'http://registry.devsapp.cn/simple') {
        const filePath = path.join(devsappPath, args.component);
        if (fs.existsSync(filePath)) {
          const data = await getComponent(filePath);
          if (data.isComponent) {
            const size = await getFolderSize(filePath);
            const outputs = {
              Component: data.Name,
              Reigstry: `serverless registry [${registry}]`,
              Version: data.Version,
              Size: `${(size / 1000 / 1000).toFixed(2)} MB`,
              Description: data.Description,
              Path: filePath,
              Hompage: data.HomePage,
            };
            logger.output(outputs);
            logger.log(`\n🙋 Delete the component, please use the command [s clean --component ${args.component}]`);
          }
        } else {
          logger.log(`不存在[${args.component}]组件，请输入指令 s component 查看所有的组件`);
        }
      }
      // git 源
      if (registry === 'https://api.github.com/repos') {
        const filePath = path.join(githubPath, args.component);
        if (fs.existsSync(filePath)) {
          const data = await getComponent(filePath);
          if (data.isComponent) {
            const size = await getFolderSize(filePath);
            const outputs = {
              Component: data.Name,
              Reigstry: `github registry [${registry}]`,
              Version: data.Version,
              Size: `${(size / 1000 / 1000).toFixed(2)} MB`,
              Description: data.Description,
              Path: filePath,
              Hompage: data.HomePage,
            };
            logger.output(outputs);
            logger.log(`\n🙋 Delete the component, please use the command [s clean --component ${args.component}]`);
          }
        } else {
          logger.log(`不存在[${args.component}]组件，请输入指令 s component 查看所有的组件`);
        }
      }
      return;
    }
  }
  command.help();
})();
