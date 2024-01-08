import { spawnSync } from 'child_process';
import path from 'path';
const s = path.resolve(__dirname, process.platform === 'win32' ? '../bin/s.cmd' : '../bin/s');
const cwd = path.join(__dirname, './fixtures/help');

test('s -h', async () => {
  const res = spawnSync(s, ['-h'], { cwd: __dirname });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toMatch(/Usage: s/);
});

test('s -h with yaml', async () => {
  const res = spawnSync(s, ['-h'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toMatch(/Usage: s/);
});

test('s demo -h with yaml', async () => {
  const res = spawnSync(s, ['demo', '-h'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toMatch(/Usage: s demo/);
});

test('s demo version -h with yaml', async () => {
  const res = spawnSync(s, ['demo', 'version', '-h'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toMatch(/Usage: s demo version/);
});

test('s demo version list -h with yaml', async () => {
  const res = spawnSync(s, ['demo', 'version', 'list', '-h'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toMatch(/Usage: s demo version list/);
});

test('s version -h with yaml', async () => {
  const res = spawnSync(s, ['version', '-h'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toMatch(/Usage: s version/);
});

test('s version list -h with yaml', async () => {
  const res = spawnSync(s, ['version', 'list', '-h'], { cwd });
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(stdout).toMatch(/Usage: s version list/);
});

describe('多个组件', () => {
  const env = {
    ...process.env,
    component: 'fc3',
  };

  test('s -h with yaml', async () => {
    const res = spawnSync(s, ['-h'], { cwd, env });
    const stdout = res.stdout.toString();
    console.log(stdout);
    expect(stdout).toMatch(/s demo -h/);
    expect(stdout).toMatch(/s next_demo -h/);
  });

  test('s demo -h with yaml', async () => {
    const res = spawnSync(s, ['demo', '-h'], { cwd, env });
    const stdout = res.stdout.toString();
    console.log(stdout);
    expect(stdout).toMatch(/Usage: s demo/);
  });

  test('s demo version -h with yaml', async () => {
    const res = spawnSync(s, ['demo', 'version', '-h'], { cwd, env });
    const stdout = res.stdout.toString();
    console.log(stdout);
    expect(stdout).toMatch(/Usage: s demo version/);
  });

  test('s demo version list -h with yaml', async () => {
    const res = spawnSync(s, ['demo', 'version', 'list', '-h'], { cwd, env });
    const stdout = res.stdout.toString();
    console.log(stdout);
    expect(stdout).toMatch(/Usage: s demo version list/);
  });

  test('s version -h with yaml', async () => {
    const res = spawnSync(s, ['version', '-h'], { cwd, env });
    const stdout = res.stdout.toString();
    console.log(stdout);
    expect(stdout).toMatch(/Usage: s version/);
  });

  test('s version list -h with yaml', async () => {
    const res = spawnSync(s, ['version', 'list', '-h'], { cwd, env });
    const stdout = res.stdout.toString();
    console.log(stdout);
    expect(stdout).toMatch(/Usage: s version list/);
  });
});
