/** @format */

import CliManager from '../../src/cli/cli-manager';

describe('init cli', () => {
  it('Verify CliManager class initialization', () => {
    const input = {
      component: 'string',
      command: 'string',
      aliasName: 'string',
      props: 'string',
    };
    class myClass extends CliManager {
      public values: any;
      constructor(data) {
        super(data);
        this.values = this.inputs;
      }
    }
    const v = new myClass(input);
    expect(v.values).toEqual(input)
  });

  it('test component inner inputs', async () => {
    try {
      const input = {
        component: 's-demo',
        command: 'test',
        aliasName: 'default',
        props: undefined,
      };
      const cli = new CliManager(input);
      const result = await cli.init();
      expect(result).toHaveProperty('props'); // 判断输入到组件的参数是否包含props
      expect(result).toHaveProperty('credentials'); // 判断输入到组件的参数是否包含credentials
      expect(result).toHaveProperty('project'); // 判断输入到组件的参数是否包含project
      expect(result).toHaveProperty('appName'); // 判断输入到组件的参数是否包含appName
    } catch (e) {
      expect(e).toMatch('error');
    }
  });
  it('test params as input', async () => {
    try {
      const input = {
        component: 's-demo',
        command: 'test',
        aliasName: 'default',
        props: '{"hello":"serverless devs"}',
      };
      const cli = new CliManager(input);
      const result = await cli.init();
      expect(result).toHaveProperty('props')
      expect(result.props).toHaveProperty('hello');
      expect(result.props).toMatchObject({ hello: 'serverless devs' }); // 判断经过入参转换后是否为对象
    } catch (e) {
      expect(e).toMatch('error');
    }
  });
});
