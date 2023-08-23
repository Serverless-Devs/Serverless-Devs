import { spawnSync } from 'child_process';
import path from 'path';
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
  const template = path.resolve(__dirname, './fixtures/basic/template.yaml');
  const res = spawnSync(s, ['deploy', '-t', template, '--debug'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toMatch(/"region":"cn-huhehaote","runtime":"nodejs14","vpcConfig":"vpc-2"/);
  expect(stdout).toMatch(/"region":"cn-huhehaote","runtime":"python3"/);
});
