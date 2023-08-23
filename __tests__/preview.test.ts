import { spawnSync } from 'child_process';
import path from 'path';
const s = path.resolve(__dirname, '../bin/s');
const cwd = path.resolve(__dirname, './fixtures/preview');
const env = { ...process.env, runtime: 'nodejs14' };

test('s preview', async () => {
  const res = spawnSync(s, ['preview'], { cwd, env });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toMatch(/nodejs14/);
  expect(stdout).toMatch(/this is a test cn-huhehaote-1740298130743624-start-hello-qszl/);
});

test('extend basic', async () => {
  const template = path.resolve(__dirname, './fixtures/preview/extend/basic/s.yaml');
  const res = spawnSync(s, ['preview', '-t', template], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(typeof stdout).toBe('string');
});

test('extend basic', async () => {
  const template = path.resolve(__dirname, './fixtures/preview/extend/huaqin/s.yaml');
  const res = spawnSync(s, ['preview', '-t', template], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(typeof stdout).toBe('string');
});
