import { spawnSync } from 'child_process';
import path from 'path';
import * as utils from '@serverless-devs/utils';
import { ENVIRONMENT_FILE_NAME } from '../src/command/environment/command/init/constant';
import { find } from 'lodash';
const s = path.resolve(__dirname, '../bin/s');
const cwd = path.resolve(__dirname, './fixtures/environment');

test('the s.yaml/s.yml file was not found', async () => {
  const res = spawnSync(s, ['environment', 'init']);
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toMatch(/the s.yaml\/s.yml file was not found/);
});

test('find the default yaml file', async () => {
  const name = 'dev';
  const options = [
    '--name',
    name,
    '--describation',
    'this is a describation',
    '--type',
    'test',
    '--region',
    'cn-chengdu',
    '--role',
    'acs:ram::<account>:role/serverlessdevsinfra-testing',
    '--props',
    '{"test":1}',
  ];
  const res = spawnSync(s, ['environment', 'init', '--debug', ...options], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  const environmentFilePath = path.join(cwd, ENVIRONMENT_FILE_NAME);
  const content = utils.getYamlContent(environmentFilePath);
  console.log(content);
  expect(find(content, { name })).toBeTruthy();
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
