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
      // TODO通过 return 去匹配当前的object
      const result = await cli.init();
      expect(result).toHaveProperty('props')
      expect(result).toHaveProperty('credentials');
      expect(result).toHaveProperty('project');
      expect(result).toHaveProperty('appName');
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
      // TODO通过 return 去匹配当前的object
      const result = await cli.init();
      expect(result).toHaveProperty('props')
      expect(result.props).toHaveProperty('hello');
      expect(result.props).toMatchObject({hello:'serverless devs'});
    } catch (e) {
      expect(e).toMatch('error');
    }
  });
});
