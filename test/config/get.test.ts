/** @format */
import { spawnSync } from 'child_process'

describe('module config', () => {
  it('s config -l', () => {
    const ls = spawnSync('s', ['config', 'get', '-l'])
    const v = Buffer.from(ls.stdout)
    expect(v.toString()).toContain('AccountID')
    expect(v.toString()).toContain('AccessKeySecret')
  });

})