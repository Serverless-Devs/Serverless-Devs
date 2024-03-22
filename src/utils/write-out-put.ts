import * as utils from '@serverless-devs/utils';
import { get, isEmpty } from 'lodash';
import fs from 'fs-extra';
import yaml from 'js-yaml';
import { IOutput } from '@serverless-devs/parse-spec';
import prettyjson from 'prettyjson';

const writeOutput = (data: Record<string, any>) => {
  if (isEmpty(data)) return;
  const argv = process.argv.slice(2);
  const argvData = utils.parseArgv(argv);
  const outputFile = get(argvData, 'output-file');
  if (!outputFile) return;
  const filePath = utils.getAbsolutePath(outputFile);
  const output = get(argvData, 'output') || get(argvData, 'output-format');
  const newMap = {
    [IOutput.JSON]: JSON.stringify(data, null, 2),
    [IOutput.YAML]: yaml.dump(data),
    [IOutput.RAW]: JSON.stringify(data),
  };
  const defaultValue = prettyjson.render(data, { keysColor: 'bold', emptyArrayMsg: '[]' });
  fs.writeFileSync(filePath, get(newMap, output, defaultValue), 'utf-8');
  // 使用cat命令查看文件时，文件的末尾会显示一个%符号，可能是由于文件的最后一行缺少换行符（\n）导致的
  fs.appendFileSync(filePath, '\n');
};

export default writeOutput;
