import { spawnSync } from 'child_process';
import path from 'path';
const s = path.resolve(__dirname, process.platform === 'win32' ? '../bin/s.cmd' : '../bin/s');
const cwd = path.resolve(__dirname, './fixtures/deploy');
const template = path.resolve(cwd, './s.yaml');

test('s deploy', async () => {
  const res = spawnSync(s, ['deploy', '-t', template]);
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(res.status).toBe(0);
});

test('s deploy -o json', async () => {
  const res = spawnSync(s, ['deploy', '-t', template, '-o', 'json']);
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(res.status).toBe(0);
});

test('s deploy -o yaml', async () => {
  const res = spawnSync(s, ['deploy', '-t', template, '-o', 'yaml']);
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(res.status).toBe(0);
});

test('s deploy -o raw', async () => {
  const res = spawnSync(s, ['deploy', '-t', template, '-o', 'raw']);
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(res.status).toBe(0);
});

test.skip('s deploy -t project-extend.yaml', async () => {
  const res = spawnSync(s, ['deploy', '-t', 'project-extend.yaml', '--debug'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(res.status).toBe(0);
});
