import { getYamlPath } from '../../src/utils/index'
import os from 'os'
describe('module utils', () => {
  it('test getYamlPath methods that get yaml folder', () => {
    const v = getYamlPath(`${os.homedir()}/.s`, 'access');
    expect(v).toBeTruthy();
  });
});