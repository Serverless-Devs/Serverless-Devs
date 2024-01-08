import { spawnSync } from 'child_process';
import path from 'path';
const s = path.resolve(__dirname, process.platform === 'win32' ? '../bin/s.cmd' : '../bin/s');
const cwd = path.resolve(__dirname, './fixtures/basic');

test('s verify', () => {
  const result = spawnSync(s, ['verify'], { cwd });
  expect(result.status).toBe(0);
  expect(result.stdout.toString()).toContain('s.yaml');
  expect(result.stdout.toString()).toContain('passed');
});

test('s verify -t', () => {
  const template = path.join(__dirname, './fixtures/verify/verify.yaml');
  const result = spawnSync(s, ['verify', '-t', template], { cwd });
  expect(result.status).toBe(0);
  expect(result.stdout.toString()).toContain('verify.yaml');
  expect(result.stdout.toString()).toContain('passed');
});

test('s verify -o', () => {
  const result = spawnSync(s, ['verify', '-o', 'json'], { cwd });
  expect(result.status).toBe(0);
  expect(result.stdout.toString()).toContain('s.yaml');
  expect(result.stdout.toString()).toContain('passed');
})

test('s verify error', () => {
  const template = path.join(__dirname, './fixtures/verify/template.yaml');
  const result = spawnSync(s, ['verify', '-t', template], { cwd });
  expect(result.status).toBe(1);
  expect(result.stdout.toString()).toContain('demo/props/runtime');
  expect(result.stdout.toString()).toContain('demo/props/timeout');
})

test('s verify error -o json', () => {
  const template = path.join(__dirname, './fixtures/verify/template.yaml');
  const result = spawnSync(s, ['verify', '-o', 'json', '-t', template], { cwd });
  expect(result.status).toBe(0);
  expect(result.stdout.toString()).toContain('demo/props/runtime');
  expect(result.stdout.toString()).toContain('demo/props/timeout');
})