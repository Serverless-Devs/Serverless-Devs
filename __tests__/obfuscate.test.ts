import { spawnSync } from 'child_process';
import path from 'path';
import { get } from 'lodash';
import { isCiCdEnvironment } from '@serverless-devs/utils';
const s = path.resolve(__dirname, process.platform === 'win32' ? '../bin/s.cmd' : '../bin/s');
const cwd = path.resolve(__dirname, './fixtures/obfuscate');

test('deploy in two env', () => {
  const result = spawnSync(s, ['deploy'], { cwd });
  expect(result.status).toBe(0);
  console.log(result.stdout.toString());
  expect(result.stdout.toString()).toContain("world");
  // not contain "need hidden" in cicd environment
  if (process.env['CICD_ENV'] == 'true' || isCiCdEnvironment()) {
    expect(result.stdout.toString()).not.toContain("need hidden");
    expect(result.stdout.toString()).toContain("need shown");
  } else {
    expect(result.stdout.toString()).toContain("need hidden");
    // set CICD_ENV to true
    process.env['CICD_ENV'] = 'true';
    // run with CICD_ENV=true
    const result2 = spawnSync(s, ['deploy'], { cwd, env: process.env });
    expect(result2.status).toBe(0);
    console.log(result2.stdout.toString());
    expect(result2.stdout.toString()).toContain("world");
    expect(result2.stdout.toString()).toContain("need shown");
    expect(result2.stdout.toString()).not.toContain("need hidden");
  }
});

test('with --output-file', () => {
  process.env['CICD_ENV'] = 'true';
  const result = spawnSync(s, ['deploy', '-o', 'json', '--output-file', 'output.json'], { cwd, env: process.env });
  expect(result.status).toBe(0);
  const output = require(path.resolve(cwd, 'output.json'));
  const test = get(output, 'hello_world.test');
  expect(test).toBe('need hidden');
});

test('obfuscate1', () => {
  process.env['CICD_ENV'] = 'true';
  const result = spawnSync(s, ['obfuscate'], { cwd, env: process.env });
  expect(result.status).toBe(0);
  expect(result.stdout.toString()).toContain('hello1_1');
  expect(result.stdout.toString()).toContain('hello1_2');
  expect(result.stdout.toString()).toContain('test2');
  expect(result.stdout.toString()).toContain('hello1_3');
  expect(result.stdout.toString()).toContain('hello1_4');
  expect(result.stdout.toString()).not.toContain('hello1_5');
  expect(result.stdout.toString()).not.toContain('hello1_6');
  expect(result.stdout.toString()).not.toContain('need hidden');
  expect(result.stdout.toString()).toContain('shown value');
});

test('obfuscate2', () => {
  process.env['CICD_ENV'] = 'true';
  const result = spawnSync(s, ['obfuscate2'], { cwd, env: process.env });
  expect(result.status).toBe(0);
  expect(result.stdout.toString()).toContain('hello2_1');
  expect(result.stdout.toString()).toContain('hello2_2');
  expect(result.stdout.toString()).toContain('test2');
  expect(result.stdout.toString()).toContain('hello2_3');
  expect(result.stdout.toString()).not.toContain('hello2_4');
  expect(result.stdout.toString()).not.toContain('hello2_5');
  expect(result.stdout.toString()).not.toContain('hello2_6');
  expect(result.stdout.toString()).not.toContain('need hidden');
  expect(result.stdout.toString()).not.toContain('hidden value');
});

test('obfuscate3', () => {
  process.env['CICD_ENV'] = 'true';
  const result = spawnSync(s, ['obfuscate3'], { cwd, env: process.env });
  expect(result.status).toBe(0);
  expect(result.stdout.toString()).not.toContain('hello3_1');
  expect(result.stdout.toString()).not.toContain('hello3_2');
  expect(result.stdout.toString()).not.toContain('test2');
  expect(result.stdout.toString()).toContain('hello3_3');
  expect(result.stdout.toString()).not.toContain('hello3_4');
  expect(result.stdout.toString()).not.toContain('hello3_5');
  expect(result.stdout.toString()).not.toContain('hello3_6');
  expect(result.stdout.toString()).not.toContain('need hidden');
  expect(result.stdout.toString()).toContain('shown value');
});