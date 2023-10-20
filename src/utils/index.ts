import { maxBy, repeat, filter, get } from 'lodash';
import TableLayout from 'table-layout';
import { getRootHome, parseArgv } from '@serverless-devs/utils';
import fs from 'fs-extra';
import path from 'path';
import { IOutput } from '@serverless-devs/parse-spec';
import logger from '@/logger';
import yaml from 'js-yaml';
const pkg = require('../../package.json');

export { default as checkNodeVersion } from './check-node-version';
export { default as setProxy } from './set-proxy';
export { default as suggestCommand } from './suggest-command';
export { default as writeOutput } from './write-out-put';
export { emoji } from '@serverless-devs/utils';

export const formatHelp = (data: { command: string; description: string }[], indent = 0) => {
  const newData = filter(data, item => item.command !== 'help');
  const commandMaxLen = maxBy(newData, item => get(item, 'command.length')).command.length;
  const descMaxLen = maxBy(newData, item => get(item, 'description.length')).description.length;
  return new TableLayout(newData, {
    padding: { left: repeat(' ', indent + 2) },
    columns: [
      {
        name: 'command',
        width: commandMaxLen + 2 > 29 ? commandMaxLen + 2 : 29,
      },
      {
        name: 'description',
        width: descMaxLen + 10,
      },
    ],
  }).toString();
};

export const formatError = (data: { key: string; value: string }[]) => {
  const keyMaxLen = maxBy(data, item => get(item, 'key.length')).key.length;
  const valueMaxLen = maxBy(data, item => get(item, 'value.length')).value.length;
  return new TableLayout(data, {
    padding: { left: '' },
    columns: [
      {
        name: 'key',
        width: keyMaxLen + 2,
      },
      {
        name: 'value',
        width: valueMaxLen + 10,
      },
    ],
  }).toString();
};

export function getVersion() {
  const data = [`${pkg.name}: ${pkg.version}`, `s-home: ${getRootHome()}`, `${process.platform}-${process.arch}`, `node-${process.version}`];
  return data.filter(o => o).join(', ');
}

export async function getFolderSize(rootItemPath: string) {
  const fileSizes = new Map();
  await processItem(rootItemPath);
  async function processItem(itemPath: string) {
    const stats = fs.lstatSync(itemPath);
    if (typeof stats !== 'object') return;
    fileSizes.set(stats.ino, stats.size);
    if (stats.isDirectory()) {
      const directoryItems = fs.readdirSync(itemPath);
      if (typeof directoryItems !== 'object') return;
      await Promise.all(directoryItems.map(directoryItem => processItem(path.join(itemPath, directoryItem))));
    }
  }
  const folderSize = Array.from(fileSizes.values()).reduce((total, fileSize) => total + fileSize, 0);
  return folderSize;
}

export const isJson = (value: string, key: string = '-p/--props') => {
  try {
    return JSON.parse(value);
  } catch (e) {
    throw new Error(`${key} parameter format error`);
  }
};

export const showOutput = (data: any) => {
  const { output = IOutput.DEFAULT } = parseArgv(process.argv.slice(2));
  if (output === IOutput.JSON) {
    return logger.write(JSON.stringify(data, null, 2));
  }
  if (output === IOutput.RAW) {
    return logger.write(JSON.stringify(data));
  }
  if (output === IOutput.YAML) {
    return logger.write(yaml.dump(data));
  }
  return logger.output(data);
}
