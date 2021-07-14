import { getYamlPath } from '../../src/utils/index'
describe('module utils', () => {
  it('test getYamlPath methods that get yaml folder', () => {
    const v = getYamlPath(`${__dirname}/fixtures`, 'path1')
    expect(v).toBeTruthy()
  });
  it('test getYamlPath methods that get yml folder', () => {
    const v = getYamlPath(`${__dirname}/fixtures`, 'path2')
    expect(v).toBeTruthy()
  });
})