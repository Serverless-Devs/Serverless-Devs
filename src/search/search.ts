/** @format */

import * as program from 'commander';
import axios from 'axios';
import logger from '../utils/logger';
import i18n from '../utils/i18n';
import {SearchError} from '../error/search-error';
import {SERVERLESS_SEARCH_URL} from '../constants/static-variable';
import {CommandError} from '../error/command-error';
import GUIService from '../gui/gui-service';
import {handlerProfileFile} from "../utils/handler-set-config";

const description = `${i18n.__('Search packages')}.

${i18n.__('Example')}:
    $ s search keywords
    $ s search keywords -p alibaba
    $ s search keywords -t component
`;
program
  .name('s search')
  .option('-p, --provider [provider]', i18n.__('The cloud service provider.'))
  .helpOption('-h, --help', i18n.__('Display help for command'))
  .option('-t, --type [type]', i18n.__('The package type. [component/plugin/application]'))
  .option('-g, --gui', i18n.__('Start gui service'))
  .description(description)
  .parse(process.argv);
(async () => {
  const gui = program.gui || false;

  if (program.args.length === 0 && gui === false) {
    program.help();
    return;
  }

  if (gui === true) {
    const guiService = new GUIService();
    await guiService.start();
  } else {
    const name = program.args[0];
    const {provider} = program;
    const type = program.type || 'application';

    try {
      await search(name, provider, type);
    } catch (err) {
      throw new SearchError('Could not get packages.');
    }
  }
})().catch(err => {
  throw new CommandError(err.message);
});

async function printn(n: number, str = ' ') {
  let temp_str = '';
  for (let i = 0; i < n; i++) {
    temp_str = temp_str + str;
  }
  return temp_str;
}

async function search(name: string, provider?: string, type?: string) {
  const lang = (await handlerProfileFile({read: true, filePath: 'set-config.yml'})).locale || 'en';
  const options = {
    url: SERVERLESS_SEARCH_URL,
    type: 'get',
    timeout: 5000,
    headers: {
      'User-Agent': 's',
    },
    params: {
      lang: lang,
      keyword: name,
      type,
      provider,
    },
  };

  let result;
  try {
    result = await axios.request(options);
  } catch (err) {
    throw new SearchError('Search failed, error: {{error}}', {error: err.message});
  }

  if (result.status !== 200) {
    throw new SearchError('Search failed, status code: {{code}}', {code: result.status});
  }
  // console.log(result.data);
  if (result.data.Error) {
    throw new SearchError('Search failed, error code: {{code}}, message:{{msg}}', {
      code: result.data.Error.Code,
      msg: result.data.Error.Message,
    });
  }

  let maxName = 0;
  let maxProviderType = 0;
  for (const entry of result.data.Response) {
    if (maxName < entry.name.length) {
      maxName = entry.name.length;
    }
    if (maxProviderType < entry.provider.length + entry.type.length) {
      maxProviderType = entry.provider.length + entry.type.length;
    }
  }

  const nameInfo = i18n.__('Name');
  const providerTypeInfo = i18n.__('Provider & Type');
  let tempNameLength;
  let tempProviderTypeLength;
  if (nameInfo === 'Name') {
    tempNameLength = maxName - nameInfo.length;
    tempProviderTypeLength = maxProviderType - providerTypeInfo.length;
  } else {
    tempNameLength = maxName - nameInfo.length * 2;
    tempProviderTypeLength = maxProviderType - providerTypeInfo.length * 2 + 1;
  }
  logger.info(
    `${nameInfo}${await printn(tempNameLength, ' ')}  ${providerTypeInfo}${await printn(
      tempProviderTypeLength,
      ' ',
    )}   ${i18n.__('Description')}\n`,
  );
  for (const entry of result.data.Response) {
    const tempNameLength = await printn(maxName - entry.name.length, ' ');
    const tempConString = entry.provider && entry.type ? '@' : '';
    const tempProviderTypeLength = await printn(
      maxProviderType - entry.provider.length - entry.type.length + (entry.provider && entry.type ? 0 : 1),
      ' ',
    );
    logger.info(
      `${entry.name}${tempNameLength}  ${entry.provider}${tempConString}${entry.type}${tempProviderTypeLength}  ${entry.description}`,
    );
  }

  logger.info('');
}
