import core from '../../src/utils/core';
const { makeUnderLine, colors } = core;

test('makeUnderLine', () => {
  const c = makeUnderLine('hi https://github.com/Serverless-Devs/Serverless-Devs, click it!');
  expect(c).toEqual(`hi ${colors.underline('https://github.com/Serverless-Devs/Serverless-Devs')}, click it!`);
});
