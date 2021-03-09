
import i18n from './i18n';
import { Logger } from '@serverless-devs/core';




export default class ServerlessPlatformLogger {
    static CONTENT = '';
    static setContent(content) {
        ServerlessPlatformLogger.CONTENT = content;
    }
    static log(m) {
        Logger.log(i18n.__(m) || m);
    }
    static info(m) {
        Logger.info(ServerlessPlatformLogger.CONTENT, i18n.__(m) || m);
    }

    static debug(m) {
        Logger.debug(ServerlessPlatformLogger.CONTENT, i18n.__(m) || m);
    }

    static error(m) {
        Logger.error(ServerlessPlatformLogger.CONTENT, i18n.__(m) || m);
    }

    static warning(m) {
        Logger.warn(ServerlessPlatformLogger.CONTENT, i18n.__(m) || m);
    }


    static success(m) {
        Logger.log(i18n.__(m) || m, 'green');
    }

}



