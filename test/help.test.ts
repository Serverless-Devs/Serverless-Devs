import help from '../src/help';
import program from '@serverless-devs/commander';

test('s -h with a service', async () => {
  process.argv = process.argv.slice(0, 2).concat(['-h']);
  const res = await help(program);
  console.log(res);
  expect(res).toBeTruthy();
});

test('s -h with many service', async () => {
  process.argv = process.argv.slice(0, 2).concat(['-h', '-t', 'test/start-fc-http-nodejs12/b.yaml']);
  const res = await help(program);
  console.log(res);
  expect(res).toBeTruthy();
});
