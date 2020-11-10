/** @format */

import {ServerlessError} from '../error/serverless-error';
import i18n from '../utils/i18n';

const colors = require('colors');
const {red, white, gray, cyan, yellow, green} = colors;

// 输出信息颜色启用或关闭
export const colorSwitch = (flag: boolean) => {
  process.env.COLORFLAG = `${flag}`;

  if (flag) {
    colors.enable();
  } else {
    colors.disable();
  }
};

if (typeof process.env.COLORFLAG === 'string') {
  colorSwitch(process.env.COLORFLAG === 'true');
}
/*
  debug 只有 debug 模式才可以输出
  error 判断是否属于 error 类型，error.messsage, debug 输出所有
*/
// 框架信息输出 白色
export const log = (...message: any) => {
  for (const m of message) {
    console.log(white(i18n.__(m)));
  }
};
// 组件输出 灰色
export const debug = (...message: any) => {
  if (process.env.VERBOSE) {
    console.log(gray(...message));
  }
};
// 错误输出 红色
export const error = (...message: any) => {
  for (const m of message) {
    if (typeof m === 'string' || m instanceof String) {
      console.log(red(i18n.__(m)));
    } else if (m instanceof ServerlessError) {
      // already i18n for serverless error
      console.log(red(m));
    } else if (m instanceof Error) {
      console.log(red(i18n.__(m.message)));
    }
  }
  /*
  if (process.env.VERBOSE) {
    console.log(red(...message));
  } else {
    const m: any[] = message.map((item: any) => {
      if (item instanceof Error) {
        return item.message;
      }
      return item;
    });
    console.log(red(...m));
  }
  */
};
// 提醒信息 蓝色
export const info = (...message: any) => {
  for (const m of message) {
    console.log(cyan(i18n.__(m)));
  }
};
// 警告信息 黄色
export const warning = (...message: any) => {
  for (const m of message) {
    console.log(yellow(i18n.__(m)));
  }
};
// 成功信息 绿色
export const success = (...message: any) => {
  for (const m of message) {
    console.log(green(i18n.__(m)));
  }
};

export default {
  info,
  debug,
  error,
  log,
  warning,
  success,
  colorSwitch,
};
