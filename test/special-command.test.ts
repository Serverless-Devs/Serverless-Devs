import SpecialCommad from '../src/special-commad';
import program from '@serverless-devs/commander';
import { split } from 'lodash';
import { logger } from '../src/utils';

beforeAll(() => {
  logger.warn(`Note that the 'sub' and 'test' of ali access must have been configured`);
});

beforeEach(() => {
  process.env['serverless-devs-debug'] = 'false';
});

test('s deploy without -t', async () => {
  const args = 'deploy -y --use-local';
  process.argv = process.argv.slice(0, 2).concat(split(args, ' '));
  const res = await new SpecialCommad(program).init();
  expect(res).toBeTruthy();
});

test('s deploy with -t s.yaml', async () => {
  const args = 'deploy -y --use-local -t test/start-fc-http-nodejs12/s.yaml';
  process.argv = process.argv.slice(0, 2).concat(split(args, ' '));
  const res = await new SpecialCommad(program).init();
  expect(res).toBeTruthy();
});

test('s deploy with -a test', async () => {
  process.env['serverless-devs-debug'] = 'true';
  const args = 'deploy -y --use-local -a test -t test/start-fc-http-nodejs12/s.yaml';
  process.argv = process.argv.slice(0, 2).concat(split(args, ' '));
  const res = await new SpecialCommad(program).init();
  expect(res).toBeTruthy();
});

test('s deploy with serve in many serve', async () => {
  const args = 'helloworld deploy -y --use-local -t test/start-fc-http-nodejs12/b.yaml';
  process.argv = process.argv.slice(0, 2).concat(split(args, ' '));
  const res = await new SpecialCommad(program).init();
  expect(res).toBeTruthy();
});

test('s deploy without serve in many serve', async () => {
  const args = 'deploy -y --use-local -t test/start-fc-http-nodejs12/b.yaml';
  process.argv = process.argv.slice(0, 2).concat(split(args, ' '));
  const res = await new SpecialCommad(program).init();
  expect(res).toBeTruthy();
});

test('s deploy without serve order in many serve', async () => {
  const args = 'deploy -y --use-local -t test/start-fc-http-nodejs12/c.yaml';
  process.argv = process.argv.slice(0, 2).concat(split(args, ' '));
  const res = await new SpecialCommad(program).init();
  expect(res).toBeTruthy();
});

test('s deploy with actions', async () => {
  const args = 'deploy -y --use-local -t test/start-fc-http-nodejs12/d.yaml';
  process.argv = process.argv.slice(0, 2).concat(split(args, ' '));
  const res = await new SpecialCommad(program).init();
  expect(res).toBeTruthy();
});

test.only('s deploy with --skip-actions', async () => {
  const args = 'deploy --skip-actions -y --use-local -t test/start-fc-http-nodejs12/d.yaml';
  process.argv = process.argv.slice(0, 2).concat(split(args, ' '));
  const res = await new SpecialCommad(program).init();
  expect(res).toBeTruthy();
});
