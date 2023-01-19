import core from '../utils/core';
import i18n from '../utils/i18n';
import path from 'path';
import logger from '../utils/logger';
import { getFolderSize } from '../utils/common';
import { getConfig } from '../utils/handler-set-config';
import { emoji } from '../utils/common';
import { HumanWarning } from '../error';
const { getYamlContent, fse: fs, colors, getRootHome, tableLayout } = core;

const description = `Get details of installed components.
    
    Example:
        $ s component
        $ s component --component fc-api

${emoji('📖')} Document: ${colors.underline(
  'https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/component.md',
)}`;

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

function notFound(args) {
  new HumanWarning({
    warningMessage: `the [${args.component}] component was not found.`,
    tips: `Please enter the command 's component' to view all components, Serverless Devs' Component document can refer to：${colors.underline(
      'https://github.com/Serverless-Devs/Serverless-Devs/blob/master/docs/zh/command/component.md',
    )}`,
  });
}

function run(program) {
  const command = program
    .command('component')
    .usage('[options]')
    .option('--component <componentName>', 'Gets the specified component information (like: fc, fc@0.0.1)')
    .helpOption('-h, --help', i18n('display_help_for_command'))
    .description(description)
    .addHelpCommand(false)
    .action(async options => {
      await doAction(options);
    });

  const doAction = async options => {
    const sPath = getRootHome();
    const componentsPath = path.join(sPath, 'components');
    const devsappPath = path.join(componentsPath, 'devsapp.cn');
    const githubPath = path.join(componentsPath, 'github.com');
    const args = core.getGlobalArgs(process.argv.slice(2));
    if (args.help) {
      return command.help();
    }
    if (args.component) {
      const registry = getConfig('registry', 'http://registry.devsapp.cn/simple');
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
          notFound(args);
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
            logger.log(
              `\n${emoji('🙋')} Delete the component, please use the command [s clean --component ${args.component}]`,
            );
          }
        } else {
          notFound(args);
        }
      }
      return;
    }
    // s component
    // s源
    if (fs.existsSync(devsappPath)) {
      const devsappDirs = fs.readdirSync(devsappPath);
      const serverlessRows = [
        {
          Component: 'Component',
          Version: 'Version',
          Size: `Size`,
          Description: 'Description',
        },
      ];
      for (const fileName of devsappDirs) {
        if (fileName === 'devsapp') {
          const devsappSubPath = path.join(devsappPath, fileName);
          const devsappSubDirs = fs.readdirSync(devsappSubPath);
          for (const devsappFileName of devsappSubDirs) {
            const filePath = path.join(devsappSubPath, devsappFileName);
            const data = await getComponent(filePath);
            if (data.isComponent) {
              const size = await getFolderSize(filePath);
              serverlessRows.push({
                Component: `devsapp/${devsappFileName}`,
                Version: data.Version,
                Size: `${(size / 1000 / 1000).toFixed(2)} MB`,
                Description: data.Description,
              });
            }
          }
        } else {
          const filePath = path.join(devsappPath, fileName);
          const data = await getComponent(filePath);
          if (data.isComponent) {
            const size = await getFolderSize(filePath);
            serverlessRows.push({
              Component: data.Name,
              Version: data.Version,
              Size: `${(size / 1000 / 1000).toFixed(2)} MB`,
              Description: data.Description,
            });
          }
        }
      }
      logger.log(`\n${emoji('🔎')} serverless registry [http://registry.devsapp.cn/simple]\n`);
      const data = new tableLayout(JSON.parse(JSON.stringify(serverlessRows)));
      logger.log(data.toString());
    }
    // github源
    if (fs.existsSync(githubPath)) {
      const githubDirs = fs.readdirSync(githubPath);
      const githubRows = [
        {
          Component: 'Component',
          Version: 'Version',
          Size: `Size`,
          Description: 'Description',
        },
      ];
      for (const fileName of githubDirs) {
        const githubSubPath = path.join(githubPath, fileName);
        const githubSubDirs = fs.readdirSync(githubSubPath);
        for (const githubFileName of githubSubDirs) {
          const filePath = path.join(githubSubPath, githubFileName);
          const data = await getComponent(filePath);
          if (data.isComponent) {
            const size = await getFolderSize(filePath);
            githubRows.push({
              Component: `${fileName}/${data.Name}`,
              Version: data.Version,
              Size: `${(size / 1000 / 1000).toFixed(2)} MB`,
              Description: data.Description,
            });
          }
        }
      }
      logger.log(`${emoji('🔎')} github registry [https://api.github.com/repos]\n`);
      const data = new tableLayout(JSON.parse(JSON.stringify(githubRows)));
      logger.log(data.toString());
    }
  };
}

export = run;
