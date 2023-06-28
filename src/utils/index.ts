import os from 'os';

export { default as getPid } from './get-pid';
export { default as checkNodeVersion } from './check-node-version';
export { default as setProxy } from './set-proxy';
export { default as publishHelp } from './publish-help';

export const emoji = (text: string, fallback?: string) => {
  if (os.platform() === 'win32') {
    return fallback || '◆';
  }
  return `${text} `;
};
