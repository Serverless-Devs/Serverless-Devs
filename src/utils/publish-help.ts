// TODO: 没有再引用，如果后面 help 没有问题就可以删除掉了
import _ from 'lodash';
import tableLayout from 'table-layout';
import { bold, underline } from 'chalk';

const keyFn = list => _.first(_.keys(list));
const descFn = list => _.first(_.values(list));
export const makeUnderLine = (text: string) => {
  const matches = text.match(/http[s]?:\/\/[^\s|,]+/);
  if (matches) {
    return text.replace(matches[0], underline(matches[0]));
  } else {
    return text;
  }
};

const publishHelper = {
  /**
   *
   * @param list  e.g.: [{'--debug': 'Open debug model.'}]
   */
  maxLen: list => {
    list = _.isArray(list) ? list : _.map(list, (item, key) => ({ [key]: item }));
    return (
      _.map(list, item => keyFn(item)).reduce((a, c) => {
        return Math.max(a, c.length);
      }, 0) + 2
    );
  },
  /**
   *
   * @param list 初始化数据
   * @param title 名称
   * @param length 整体长度
   * @param leftPad 距离左侧长度
   * @returns
   */
  helpInfo: (list, title, length, leftPad = 0) => {
    if (_.isPlainObject(list) && _.isObject(descFn(list))) {
      return (
        `${underline(bold(title))}` +
        _.reduce(
          list,
          (total, item, key) => {
            total += `\n` + publishHelper.helpInfo(item, key, length - 2, 2);
            return total;
          },
          '',
        )
      );
    }
    list = _.isArray(list)
      ? _.map(list, item => ({
          command: [keyFn(item)],
          desc: descFn(item),
        }))
      : _.map(list, (item, key) => ({ command: key, desc: item }));
    if (_.isEmpty(list)) {
      return '';
    }
    const proxy = list.map(row => {
      return new Proxy(row, {
        get(target, property, receiver) {
          if (property === 'desc') {
            return `${makeUnderLine(target.desc)}`;
          } else {
            return Reflect.get(target, property, receiver);
          }
        },
      });
    });
    return (
      `${_.repeat(' ', leftPad)}${leftPad ? bold(title) : underline(bold(title))}\n` +
      new tableLayout(proxy, {
        padding: { left: _.repeat(' ', leftPad + 2) },
        columns: [
          {
            name: 'command',
            width: length + 2,
          },
        ],
      }).toString()
    );
  },
};

export default publishHelper;
