import { spawnSync } from 'child_process';
import path from 'path';
import * as utils from '@serverless-devs/utils';
import { ENVIRONMENT_FILE_NAME } from '../src/command/env/command/init/constant';
import { find, get } from 'lodash';
const s = path.resolve(__dirname, '../bin/s');
const cwd = path.resolve(__dirname, './fixtures/env');

test('init', async () => {
  const name = 'dev';
  const args = [
    '--name',
    name,
    '--project',
    'custom-project',
    '--description',
    'this is a description',
    '--type',
    'test',
    '--region',
    'cn-chengdu',
    '--role',
    'acs:ram::<account>:role/serverlessdevsinfra-testing',
  ];
  spawnSync(s, ['env', 'init', ...args], { cwd });
  const environmentFilePath = path.join(cwd, ENVIRONMENT_FILE_NAME);
  const res = utils.getYamlContent(environmentFilePath);
  console.log(res);
  expect(find(get(res, 'environments'), { name })).toBeTruthy();
});

test.only('init -t', async () => {
  const name = 'custom';
  const template = 'custom.yaml';
  const args = [
    '--name',
    name,
    '--project',
    'custom-project',
    '--description',
    'this is a description',
    '--type',
    'test',
    '--region',
    'cn-chengdu',
    '--role',
    'acs:ram::<account>:role/serverlessdevsinfra-testing',
    '-t',
    template,
  ];
  spawnSync(s, ['env', 'init', ...args], { cwd });
  const environmentFilePath = path.join(cwd, template);
  const res = utils.getYamlContent(environmentFilePath);
  console.log(res);
  expect(find(get(res, 'environments'), { name })).toBeTruthy();
});

test('deploy', async () => {
  const res = spawnSync(s, ['deploy', '--env', 'prod', '--debug'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(res.status).toBe(0);
});

test('preview', async () => {
  const res = spawnSync(s, ['preview', '--env', 'prod', '--debug'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(res.status).toBe(0);
});
