import { spawnSync } from 'child_process';
import path from 'path';
import fs from 'fs-extra';
import * as utils from '@serverless-devs/utils';
const s = path.resolve(__dirname, '../bin/s');
const pkg = require('../package.json');
const cwd = path.resolve(__dirname, './fixtures/basic');

test('s -v', async () => {
  const res = spawnSync(s, ['-v']);
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toContain(pkg.version);
  expect(stdout).toContain(utils.getRootHome());
  expect(stdout).toContain(utils.getCurrentEnvironment());
});

test('s emptyarray', async () => {
  const res = spawnSync(s, ['emptyarray'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toMatch(/\[\]/);
});

test('template in yaml', async () => {
  const template = path.join(__dirname, './fixtures/basic/template.yaml');
  const res = spawnSync(s, ['deploy', '-t', template, '--debug'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toMatch(/"region":"cn-huhehaote","runtime":"nodejs14","vpcConfig":"vpc-2"/);
  expect(stdout).toMatch(/"region":"cn-huhehaote","runtime":"python3"/);
});

test('--output-file', async () => {
  const dest = path.join(__dirname, './fixtures/basic');
  const outputFile = path.join(dest, 'output.json');
  const template = path.join(dest, 's.yaml');
  const res = spawnSync(s, ['deploy', '-t', template, '--output', 'json', '--output-file', outputFile], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(fs.existsSync(outputFile)).toBeTruthy();
});


test('--no-verify', async () => {
  const dest = path.join(__dirname, './fixtures/basic');
  const template = path.join(dest, 'verify.yaml');
  const res = spawnSync(s, ['deploy', '-t', template, '--no-verify'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(res.status).toBe(0);
});

test('--skip-actions v3', async () => {
  const dest = path.join(__dirname, './fixtures/skip-actions');
  const template = path.join(dest, 's.yaml');
  const res = spawnSync(s, ['deploy', '-t', template, '--skip-actions']);
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(res.status).toBe(0);
});

test.skip('--skip-actions v2', async () => {
  const dest = path.join(__dirname, './fixtures/v2/skip-actions');
  const template = path.join(dest, 's.yaml');
  const res = spawnSync(s, ['deploy', '-t', template, '--skip-actions']);
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(res.status).toBe(0);
});


test.skip(`config('AccountID') v3`, async () => {
  const dest = path.join(__dirname, './fixtures/basic');
  const template = path.join(dest, 'config.yaml');
  const res = spawnSync(s, ['deploy', '-t', template, '--debug'], { env: { ...process.env, BUILD_IMAGE_ENV: 'fc-backend', serverless_devs_access_cicd_alias_name: 'default' } });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(res.status).toBe(0);
});

test.skip(`config('AccountID') v2`, async () => {
  const dest = path.join(__dirname, './fixtures/v2/config');
  const template = path.join(dest, 's.yaml');
  const res = spawnSync(s, ['deploy', '-t', template, '--debug'], { env: { ...process.env, BUILD_IMAGE_ENV: 'fc-backend', serverless_devs_access_cicd_alias_name: 'default' } });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(res.status).toBe(0);
});

// sl cli fc api ListServices -o json --output-file o.json
// sl cli fc3@dev layer list -a shl --region cn-hangzhou -o json --output-file o.json
