import { HumanError } from '../error';

function checkNodeVersion() {
  const nodeVersion = Number(process.version.split('.')[0].slice(1));
  if (nodeVersion < 12) {
    new HumanError({
      errorMessage: 'Node.js version must be greater than or equal to 12.0.0',
      tips: `Your current Node.js version is ${process.version}, please upgrade your Node.js version at https://nodejs.org/en/.`,
    });
    process.exit(1);
  }
}

export default checkNodeVersion;
