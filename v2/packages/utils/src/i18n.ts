/** @format */



import path from 'path';
import { I18n } from 'i18n';
import configSet from './handler-set-config';
const i18n = new I18n();
i18n.configure({
    logDebugFn(msg?: any) { },
    logWarnFn(msg?: any) { },
    logErrorFn(msg?: any) { },
    locales: ['en', 'zh'],
    directory: path.join(__dirname, '/locales'),
    register: global,
});

const locale = configSet.getConfig('locale');
if (locale) {
    i18n.setLocale(locale);
} else {
    i18n.setLocale('en');
}

export default i18n;
