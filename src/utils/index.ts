import os from 'os';
import { maxBy, repeat, filter } from 'lodash'
import TableLayout from 'table-layout';

export { default as getPid } from './get-pid';
export { default as checkNodeVersion } from './check-node-version';
export { default as setProxy } from './set-proxy';

export const emoji = (text: string, fallback?: string) => {
  if (os.platform() === 'win32') {
    return fallback || '◆';
  }
  return `${text} `;
};


export const tableLayout = (data: { command: string, description: string }[], indent = 0) => {
  const newData = filter(data, (item) => item.command !== 'help')
  const commandMaxLen = maxBy(newData, (item) => item.command.length).command.length;
  const descMaxLen = maxBy(newData, (item) => item.description.length).description.length;
  return new TableLayout(newData, {
    padding: { left: repeat(' ', indent + 2) },
    columns: [
      {
        name: 'command',
        width: commandMaxLen + 2 > 29 ? commandMaxLen + 2 : 29,
      },
      {
        name: 'description',
        width: descMaxLen + 10,
      },
    ],
  }).toString()
}