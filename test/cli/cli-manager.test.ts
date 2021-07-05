/** @format */

import CliManager, { CliParams } from '../../src/cli/cli-manager';

describe('init cli', () => {
  it('Verify CliManager class initialization', () => {
    const input: CliParams = {
      component: 'string',
      command: 'string',
      access: 'string',
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
      const input: CliParams = {
        component: 's-demo',
        command: 'test',
        access: 'default',
        props: undefined,
      };
      const cli = new CliManager(input);
      let access = process.env['serverless_devs_temp_access'] ? process.env['serverless_devs_temp_access'] : input.access;
      input.access = access;
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
      const input: CliParams = {
        component: 's-demo',
        command: 'test',
        access: 'default',
        props: '{"hello":"serverless devs"}',
      };
      let access = process.env['serverless_devs_temp_access'] ? process.env['serverless_devs_temp_access'] : input.access;
      input.access = access;
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
