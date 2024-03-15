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
  } else {
    expect(result.stdout.toString()).toContain("need hidden");
    // set CICD_ENV to true
    process.env['CICD_ENV'] = 'true';
    // run with CICD_ENV=true
    const result2 = spawnSync(s, ['deploy'], { cwd, env: process.env });
    expect(result2.status).toBe(0);
    console.log(result2.stdout.toString());
    expect(result2.stdout.toString()).toContain("world");
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
