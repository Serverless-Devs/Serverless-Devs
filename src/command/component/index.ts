import { Command } from 'commander';
import chalk from 'chalk';
import { emoji, getFolderSize } from '@/utils';
import logger from '@/logger';
import path from 'path';
import * as utils from '@serverless-devs/utils';
import fs from 'fs-extra';
import TableLayout from 'table-layout';
import { get, maxBy } from 'lodash';

const description = `Get details of installed components.
  
  Example:
    $ s component
    
${emoji('📖')} Document: ${chalk.underline('https://serverless.help/t/s/component')}`;

export default (program: Command) => {
  program
    .command('component')
    .description(description)
    .summary(`Installed component information`)
    .helpOption('-h, --help', 'Display help for command.')
    .action(async options => {
      await doAction(options);
    });
};

const doAction = async options => {
  const home = utils.getRootHome();
  const componentPath = path.join(home, 'components');
  const devsappPath = path.join(componentPath, 'devsapp.cn');
  if (!fs.existsSync(devsappPath)) {
    logger.tips('Not found component.', `You can visit ${chalk.cyan.underline('https://serverless.help/t/s/quick_start')} to learn more.`);
    return;
  }
  const devsappDir = fs.readdirSync(devsappPath);
  const rows = [
    {
      Component: 'Component',
      Version: 'Version',
      Size: `Size`,
      Description: 'Description',
    },
  ];
  for (const dir of devsappDir) {
    // v3
    if (dir === 'v3') {
      const subPath = path.join(devsappPath, dir);
      const subDir = fs.readdirSync(subPath);
      for (const fileName of subDir) {
        const filePath = path.join(subPath, fileName);
        const data = await getComponent(filePath);
        if (data.isComponent) {
          const size = await getFolderSize(filePath);
          rows.push({
            Component: `${dir}/${fileName}`,
            Version: data.Version,
            Size: `${(size / 1000 / 1000).toFixed(2)} MB`,
            Description: data.Description,
          });
        }
      }
    } else if (dir === 'devsapp') {
      const subPath = path.join(devsappPath, dir);
      const subDir = fs.readdirSync(subPath);
      for (const fileName of subDir) {
        const filePath = path.join(subPath, fileName);
        const data = await getComponent(filePath);
        if (data.isComponent) {
          const size = await getFolderSize(filePath);
          rows.push({
            Component: `${dir}/${fileName}`,
            Version: data.Version,
            Size: `${(size / 1000 / 1000).toFixed(2)} MB`,
            Description: data.Description,
          });
        }
      }
    } else {
      const filePath = path.join(devsappPath, dir);
      const data = await getComponent(filePath);
      if (data.isComponent) {
        const size = await getFolderSize(filePath);
        rows.push({
          Component: data.Name,
          Version: data.Version,
          Size: `${(size / 1000 / 1000).toFixed(2)} MB`,
          Description: data.Description,
        });
      }
    }
  }
  logger.write(`\n${emoji('🔎')} serverless registry [https://registry.serverless-devs.com]\n`);
  const getWidth = (key: string) => maxBy(rows, item => get(item, `${key}.length`))[key].length;
  logger.write(
    new TableLayout(rows, {
      columns: [
        {
          name: 'Component',
          width: getWidth('Component') + 4,
        },
        {
          name: 'Version',
          width: getWidth('Version') + 4,
        },
        {
          name: 'Size',
          width: getWidth('Size') + 4,
        },
        {
          name: 'Description',
          width: getWidth('Description') + 10,
        },
      ],
    }).toString(),
  );
};

async function getComponent(filePath: string) {
  const data = utils.getYamlContent(path.join(filePath, 'publish.yaml'));
  if (data && data.Type === 'Component') {
    data.isComponent = true;
    return data;
  }
  return {
    isComponent: false,
  };
}
