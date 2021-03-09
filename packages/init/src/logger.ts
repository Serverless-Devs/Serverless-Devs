
import i18n from './i18n';
import { Logger } from '@serverless-devs/core';




export default class ServerlessInitLogger {
    static CONTENT = '';
    static setContent(content) {
        ServerlessInitLogger.CONTENT = content;
    }
    static log(m) {
        Logger.log(i18n.__(m) || m);
    }
    static info(m) {
        Logger.info(ServerlessInitLogger.CONTENT, i18n.__(m) || m);
    }

    static debug(m) {
        Logger.debug(ServerlessInitLogger.CONTENT, i18n.__(m) || m);
    }

    static error(m) {
        Logger.error(ServerlessInitLogger.CONTENT, i18n.__(m) || m);
    }

    static warning(m) {
        Logger.warn(ServerlessInitLogger.CONTENT, i18n.__(m) || m);
    }


    static success(m) {
        Logger.log(i18n.__(m) || m, 'green');
    }

}



