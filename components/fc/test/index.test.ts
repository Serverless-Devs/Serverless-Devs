import ComponentStarter from '../src/index';

describe('test/index.test.ts', () => {
  it('should 返回输入参数', async () => {
    const componentStarter = new ComponentStarter();
    const argParams = {
      Region: 'cn-hangzhou',
      CodeUri: './src',
      ProjectName: 'ExpressComponent',
      Component: 'component-stater',
      Provider: 'alibaba',
      AccessAlias: '',
      Command: 'test',
    };
    const result = await componentStarter.test(argParams);
    expect(result.Result).toBe('hello world');
  });
});
