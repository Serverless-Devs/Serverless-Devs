
import fs from 'fs';
import path from 'path';
// import Table from 'tty-table';
import { get } from 'lodash';
import { help } from '@serverless-devs/core';

const SINGLE_VARS = ['string', 'number', 'boolean', 'null', 'undefined'];

export default class BaseComponent {
  protected client;
  name: string;
  private basePath: string;
  private docPath: string;
  constructor(protected inputs: any) {
    const libBasePath = this.__getBasePath();
    const pkgPath = path.join(libBasePath, '..', 'package.json');
    this.docPath = path.resolve(libBasePath, '..', 'doc', 'doc.json');
    if (pkgPath) {
      const pkg = JSON.parse(fs.readFileSync(path.join(pkgPath), 'utf8'));
      this.name = pkg.name;
    }
  }

  __getBasePath() {
    if (this.basePath) {
      return this.basePath;
    }
    const baseName = path.basename(__dirname);
    if (baseName !== 'dist') {
      this.basePath = path.join(__dirname, '..');
    } else {
      this.basePath = __dirname;
    }
    return this.basePath;
  }

  private getEntityByName(entityName) {
    if (fs.existsSync(this.docPath)) {
      const fileContent: string = fs.readFileSync(this.docPath).toString();
      const result = JSON.parse(fileContent);
      const interfaces = get(result, 'children', []).filter(({ name }) => name.includes('interface') || name.includes('command/') || name.includes('entity'));
      let fullInputParams: any = {};
      interfaces.forEach((_interface) => {
        const data = get(_interface, 'children', []).filter((item) => item.name === entityName)[0];
        if (data) {
          fullInputParams = data;
        }
      });
      return fullInputParams;
    }
  }

  private getEntityHelpInfoByName(name, simpleType = false) {
    const inputPropParams = this.getEntityByName(name);
    const content = get(inputPropParams, 'comment.shortText');
    const tags = get(inputPropParams, 'comment.tags', []);
    const preHelpItem = [];
    const afterHelpItem = [];
    const example = [];
    tags.forEach((item) => {
      if (item.tag === 'example') {
        example.push(item);
      }
      if (item.tag === 'pre_help') {
        preHelpItem.push(item);
      }
      if (item.tag === 'after_help') {
        afterHelpItem.push(item);
      }
    });
    const paramsList = get(inputPropParams, 'children', []);
    const optionList = paramsList.map((item) => {
      const { name } = item;
      const description = get(item, 'comment.shortText');
      const tagData = get(item, 'comment.tags', []);
      const aliasTag = tagData.filter((item) => item.tag === 'alias')[0] || {};
      const alias = aliasTag.text ? aliasTag.text.replace(/\n/g, '') : '';
      const defaultOption = get(item, 'flags.isOptional', false);
      let type = get(item, 'type.name');
      if (!SINGLE_VARS.includes(type)) {
        // const typeDetail = this.translateType(type);
        // type = `${type} <${typeDetail}> `;
        type = 'string';
      }
      if (alias) {
        return { name, typeLabel: type, description, alias, defaultOption };
      }

      return { name, typeLabel: type, description, defaultOption };
    });
    const finalPreHelpData = preHelpItem.map((item) => {
      if (item.text) {
        let jsonData: any = {};
        try {
          jsonData = JSON.parse(item.text);
          if (jsonData.ref) {
            return this.getEntityHelpInfoByName(jsonData.ref, true)[0];
          }
          return jsonData;
        } catch (e) {
          return {
            header: '',
            context: item.text,
          };
        }
      }
    });

    const finalAfterHelpData = afterHelpItem.map((item) => {
      if (item.text) {
        let jsonData: any = {};
        try {
          jsonData = JSON.parse(item.text);
          if (jsonData.ref) {
            return this.getEntityHelpInfoByName(jsonData.ref, true)[0];
          }
          return jsonData;
        } catch (e) {
          return {
            header: '',
            context: item.text,
          };
        }
      }
    });
    const finalExampleData = example.map((item) => {
      if (item.shortText) {
        return {
          header: 'example',
          content: item.shortText,
        };
      }
      if (item.text) {
        let jsonData = {};
        try {
          jsonData = JSON.parse(item.text);
          return jsonData;
        } catch (e) {
          return {
            header: 'example',
            content: item.text,
          };
        }
      }
    });
    let finalOptionData = [];
    if (simpleType) {
      finalOptionData = [{
        header: content,
        optionList,
      }];
    } else {
      finalOptionData = [{
        header: 'Usage',
        content,
      }];
      if (optionList.length > 0) {
        finalOptionData.push({
          header: 'Options',
          optionList,
        });
      }
    }

    return [...finalPreHelpData, ...finalOptionData, ...finalAfterHelpData, ...finalExampleData];
  }


  protected help(name) {
    const helpInfo = this.getEntityHelpInfoByName(name);
    help(helpInfo);
  }
}
