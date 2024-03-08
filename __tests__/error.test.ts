import { spawnSync } from 'child_process';
import path from 'path';
const s = path.resolve(__dirname, process.platform === 'win32' ? '../bin/s.cmd' : '../bin/s');
const cwd = path.resolve(__dirname, './fixtures/error');

test('s error', async () => {
  const res = spawnSync(s, ['error'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toMatch(/the s.yaml\/s.yml file was not found/);
});

test('s error -t not-found.yaml', async () => {
  const res = spawnSync(s, ['deploy', '-t', 'not-found.yaml'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toMatch(/The specified template file does not exist: not-found.yaml/);
});

test('s error -t format-error.yaml', async () => {
  const res = spawnSync(s, ['deploy', '-t', 'format-error.yaml'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toMatch(/format-error.yaml format is incorrect/);
});

test('s error -t ./extend/s.yaml', async () => {
  const res = spawnSync(s, ['deploy', '-t', './extend/s.yaml'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toMatch(/base.yaml format is incorrect/);
});

test('s error -t component-not-found.yaml', async () => {
  const res = spawnSync(s, ['deploy', '-t', 'component-not-found.yaml'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toMatch(/Component or plugin xxx is not found/);
});

test('s deploy -t invalid-flow.yaml', async () => {
  const res = spawnSync(s, ['deploy', '-t', 'invalid-flow.yaml'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toMatch(/flow is invalid/);
});

test('s xx -t basic.yaml', async () => {
  const res = spawnSync(s, ['xx', '-t', 'basic.yaml'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toMatch(/TIPS/);
  expect(stdout).toMatch(/The \[xx\] command was not found/);
});

test('s demo xx -t basic.yaml', async () => {
  const res = spawnSync(s, ['demo', 'xx', '-t', 'basic.yaml'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toMatch(/Error Message/);
  expect(stdout).toMatch(/The \[xx\] command was not found/);
});

test('s apierror -t basic.yaml', async () => {
  const res = spawnSync(s, ['apierror', '-t', 'basic.yaml'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toMatch(/ServiceNotFound: code: 404/);
});

test('s deploy -t output.yaml', async () => {
  const res = spawnSync(s, ['deploy', '-t', 'output.yaml'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toMatch(/RuntimeError/);
});

test('s config add --AccessKeyID 123 --AccessKeySecret 456 -a test', async () => {
  const res = spawnSync(s, ['config', 'add', '--AccessKeyID', '123', '--AccessKeySecret', '456', '-a', 'test', '-f'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toMatch(/Specified access key is not found/);
});

test('s config get -a not-exist', async () => {
  const res = spawnSync(s, ['config', 'get', '-a', 'not-exist'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toMatch(/You have not yet been found to have configured key information/);
});

test('s config rename --source source --target target', async () => {
  const res = spawnSync(s, ['config', 'rename', '--source', 'source', '--target', 'target'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toMatch(/Not found source alias name: source/);
});

test('s config delete -a not-exist', async () => {
  const res = spawnSync(s, ['config', 'delete', '-a', 'not-exist'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toMatch(/Not found alias name: not-exist/);
});

test('s init xxx -d shltest', async () => {
  const res = spawnSync(s, ['init', 'xx', '-d', 'shltest'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toMatch(/Application xx is not found/);
});

test('s set analsis', async () => {
  const res = spawnSync(s, ['set', 'analsis'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toMatch(/Unknown command/);
});

test('pre deploy format error', async () => {
  const res = spawnSync(s, ['deploy', '-t', 'pre-deploy-format-error.yaml'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toMatch(/Project action pre-deploy is invalid, it must be array/);
});
