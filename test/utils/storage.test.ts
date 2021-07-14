import fs from 'fs-extra';
import os from 'os'
import { getHomeDir, getHistoryFile } from '../../src/utils/storage'

describe('module storage', () => {
  it('test getHomeDir methods', () => {
    const path = getHomeDir()
    expect(path).toContain('.s')
    const v = fs.existsSync(`${os.homedir()}/.s`)
    expect(v).toBeTruthy()
  });
  it('test getHistoryFile methods', () => {
    const path = getHistoryFile()
    expect(path).toContain('history')
    const v = fs.existsSync(`${os.homedir()}/.s/history`)
    expect(v).toBeTruthy()
  });
})