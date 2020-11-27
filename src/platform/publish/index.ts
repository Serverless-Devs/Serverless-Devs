/** @format */

import * as program from 'commander';
import * as fs from 'fs-extra';
import i18n from '../../utils/i18n';
import {PlatformPublishManager} from './platform-publish-manager';
import {PlatformLoginManager} from '../login/login-manager';
import GUIService from '../../gui/gui-service';
import {PlatformPublishError} from '../../error/platform-publish-error';
import {CommandError} from '../../error/command-error';
const description = ` ${i18n.__('Publish package.')}

     ${i18n.__('Example')}:
        $ s platform publish`;
program
  .name('s platform publish')
  .option('-g, --gui', i18n.__('Start gui service'))
  // .option('-s, --skip', i18n.__('Skip the update configuration information step and publish directly'))
  .description(description)
  .helpOption('-h, --help', i18n.__('Display help for command'))
  .parse(process.argv);
(async () => {
  const {gui} = program;
  if (gui) {
    const guiService = new GUIService('/publish');
    guiService.start();
    return;
  }
  const loginManger: PlatformLoginManager = new PlatformLoginManager();
  if (!loginManger.isCurrentLogin()) {
    throw new PlatformPublishError('Please login in first.');
  }
  const token = loginManger.getLoginToken();

  if (!fs.existsSync('publish.yaml')) {
    throw new Error('No publish.yaml exists in current dir.');
  }
  if (!fs.existsSync('readme.md')) {
    throw new Error('No readme exists in current dir.');
  }
  if (!fs.existsSync('src')) {
    throw new Error('No src exists in current dir.');
  }
  const publishManager = new PlatformPublishManager();
  const encoding = 'utf-8';
  const publish: string = fs.readFileSync('publish.yaml', encoding); // TODO encoding
  let readme_zh: string
  try{
    readme_zh = fs.readFileSync('readme_zh.md', encoding); // TODO encoding
  }catch (err){
    readme_zh = ""
  }
  let readme_en: string
  try{
    readme_en = fs.readFileSync('readme_en.md', encoding); // TODO encoding
  }catch (err){
    readme_en = ""
  }
  const readme = {zh: readme_zh, en: readme_en}
  await publishManager.publish(token, publish, readme);
})().catch(err => {
  throw new CommandError(err.message);
});
