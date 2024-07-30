import { spawnSync } from 'child_process';
import path from 'path';
import * as fs from 'fs-extra';
import * as utils from '@serverless-devs/utils';
import { ENVIRONMENT_FILE_NAME } from '@serverless-devs/parse-spec';
import { find, get } from 'lodash';
const s = path.resolve(__dirname, process.platform === 'win32' ? '../bin/s.cmd' : '../bin/s');
const cwd = path.resolve(__dirname, './fixtures/env');
const cwdEmpty = path.resolve(__dirname, './fixtures/empty');

test('set', async () => {
  const res = spawnSync(s, ['env', 'set', '--component', 'ServerlessDevsAdmin@dev'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(res.status).toBe(0);
});

test('init', async () => {
  const environmentFilePath = path.join(cwd, ENVIRONMENT_FILE_NAME);
  fs.removeSync(environmentFilePath);
  const name = 'dev';
  const args = [
    '--name',
    name,
    '--project',
    'custom-project',
    '--description',
    'this is a description',
    '--type',
    'testing',
    '--overlays',
    '{"components":{"fc3test":{"region":"hangzhou"}}}',
    '--debug',
  ];
  const runRes = spawnSync(s, ['env', 'init', ...args], { cwd, stdio: 'inherit' });
  const res = utils.getYamlContent(environmentFilePath);
  console.log(res);
  console.log(runRes);
  expect(runRes.status).toBe(0);
  expect(find(get(res, 'environments'), { name })).toBeTruthy();
});

test('init -t', async () => {
  const name = 'custom';
  const template = 's-custom.yaml';
  const envFilePath = 'custom.yaml';
  const environmentFilePath = path.join(cwd, envFilePath);
  fs.removeSync(environmentFilePath);
  const args = [
    '--name',
    name,
    '--project',
    'custom-project',
    '--description',
    'this is a description',
    '--type',
    'testing',
    '--overlays',
    '{"components":{"fc3test":{"region":"hangzhou"}}}',
    '-t',
    template,
  ];
  const runRes = spawnSync(s, ['env', 'init', ...args], { cwd, stdio: 'inherit' });
  const res = utils.getYamlContent(environmentFilePath);
  console.log(res);
  console.log(runRes);
  expect(runRes.status).toBe(0);
  expect(find(get(res, 'environments'), { name })).toBeTruthy();
});

test('deploy', async () => {
  const res = spawnSync(s, ['deploy', '--env', 'dev', '--debug'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(res.status).toBe(0);
});

test('preview', async () => {
  const res = spawnSync(s, ['preview', '--env', 'dev', '--debug'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(res.status).toBe(0);
});

test('describe', async () => {
  const name = 'dev';
  const template = 's-update.yaml';
  const args = ['--name', name, '-t', template];
  const res = spawnSync(s, ['env', 'describe', ...args], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(res.status).toBe(0);
});

test('default --name', async () => {
  const res = spawnSync(s, ['env', 'default', '--name', 'dev'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(res.status).toBe(0);
});

test('default', async () => {
  const res = spawnSync(s, ['env', 'default'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(res.status).toBe(0);
});

test('destroy', async () => {
  const name = 'dev';
  const args = ['--name', name];
  const res = spawnSync(s, ['env', 'destroy', ...args], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(res.status).toBe(0);
});

test('list', async () => {
  const res = spawnSync(s, ['env', 'list', '-t', 's-update.yaml'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(res.status).toBe(0);
});

test('specify env not found', async () => {
  const res = spawnSync(s, ['deploy', '--env', 'dev1'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(res.status).toBe(0);
  expect(stdout).toContain('Env [dev1] was not found, run without environment.');
});

test('default env not found', async () => {
  const res = spawnSync(s, ['deploy'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(res.status).toBe(0);
  expect(stdout).toContain('Default env [dev] is not found, run without environment.');
});

test('init v2', async () => {
  const name = 'dev';
  const args = [
    '--name',
    name,
    '--project',
    'custom-project',
    '--description',
    'this is a description',
    '--type',
    'testing',
    '--overlays',
    '{"components":{"fc3test":{"region":"hangzhou"}}}',
    '--debug',
    '-t',
    's-v2.yaml'
  ];
  const res = spawnSync(s, ['env', 'init', ...args], { cwd, stdio: 'inherit' });
  console.log(res);
  expect(res.status).toBe(0);
});

test('describe v2', async () => {
  const name = 'dev';
  const template = 's-v2.yaml';
  const args = ['--name', name, '-t', template];
  const res = spawnSync(s, ['env', 'describe', ...args], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toContain('Not support template');
});

test('destroy v2', async () => {
  const name = 'dev';
  const args = ['--name', name, '-t', 's-v2.yaml'];
  const res = spawnSync(s, ['env', 'destroy', ...args], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toContain('Not support template');
});

test('list v2', async () => {
  const res = spawnSync(s, ['env', 'list', '-t', 's-v2.yaml'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toContain('Not support template');
})

test('init with no s.yaml', async () => {
  const name = 'dev';
  const args = [
    '--name',
    name,
    '--project',
    'custom-project',
    '--description',
    'this is a description',
    '--type',
    'testing',
    '--overlays',
    '{"components":{"fc3test":{"region":"hangzhou"}}}',
    '--debug',
  ];
  const res = spawnSync(s, ['env', 'init', ...args], { cwd: cwdEmpty });
  console.log(res);
  expect(res.status).toBe(0);
  expect(fs.existsSync(path.join(cwd, 'env.yaml'))).toBeTruthy();
});

test('describe with no s.yaml', async () => {
  const name = 'dev';
  const args = ['--name', name];
  const res = spawnSync(s, ['env', 'describe', ...args], { cwd: cwdEmpty });
  console.log(res);
  expect(res.status).toBe(0);
  const stdout = res.stdout.toString();
  expect(stdout).toContain('this is a description');
});

test('list with no s.yaml', async () => {
  const res = spawnSync(s, ['env', 'list'], { cwd: cwdEmpty });
  console.log(res);
  expect(res.status).toBe(0);
  const stdout = res.stdout.toString();
  expect(stdout).toContain('this is a description');
});

test('default with no s.yaml', async () => {
  const res = spawnSync(s, ['env', 'default'], { cwd: cwdEmpty });
  expect(res.status).toBe(1);
  const stdout = res.stdout.toString();
  expect(stdout).toContain('file was not found.');
});

test('destroy with no s.yaml', async () => {
  const name = 'dev';
  const args = ['--name', name];
  const res = spawnSync(s, ['env', 'destroy', ...args], { cwd: cwdEmpty });
  console.log(res);
  expect(res.status).toBe(0);
  const stdout = res.stdout.toString();
  expect(stdout).toContain('The environment dev was destroyed successfully');
});