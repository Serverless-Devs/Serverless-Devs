import * as config from './handler-set-config';
const i18n = require('i18n');
const path = require('path');

i18n.configure({
  logDebugFn: function (msg?:any) {},
  logWarnFn: function (msg?:any) {},
  logErrorFn: function (msg?:any) {},
  locales: ['en', 'zh'],
  directory: path.join(__dirname, '/locales'),
  register: global
});



const locale = config.getConfig('locale');
if (locale) {
  i18n.setLocale(locale);
} else {
  i18n.setLocale('en');
}


export default i18n;