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
    expect(v.values).toEqual(input);
  });

  it('Load the specified Components', async () => {
    try {
      const input = {
        component: 'fc-api',
        command: 'listServices',
        aliasName: 'default',
        props: undefined,
      };
      const cli = new CliManager(input);
      // TODO通过 return 去匹配当前的object
      await cli.init();
    } catch (e) {
      expect(e).toMatch('error');
    }
  });
});
