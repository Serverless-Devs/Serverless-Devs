import { spawnSync } from 'child_process';
import path from 'path';
const s = path.resolve(__dirname, '../bin/s');
const template = path.resolve(__dirname, './fixtures/deploy/s.yaml');

test('s deploy', async () => {
  const res = spawnSync(s, ['deploy', '-t', template]);
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(typeof stdout).toBe('string');
});

test('s deploy -o json', async () => {
  const res = spawnSync(s, ['deploy', '-t', template, '-o', 'json']);
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toMatch(/"hello": "world"/);
});

test('s deploy -o yaml', async () => {
  const res = spawnSync(s, ['deploy', '-t', template, '-o', 'yaml']);
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toMatch(/hello: world/);
});

test('s deploy -o raw', async () => {
  const res = spawnSync(s, ['deploy', '-t', template, '-o', 'raw']);
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toMatch(/"hello":"world"/);
});
