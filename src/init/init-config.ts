import { i18n } from '../utils';
import os from 'os';
import path from 'path';
import fs from 'fs-extra';
import { getLang } from '../utils/common';
import { map, each, concat, filter, lowerCase, sortBy } from 'lodash';
import templateJson from './template';

function getTemplateData() {
  const S_ROOT_HOME = path.join(os.homedir(), '.s');
  const cachePath = path.join(S_ROOT_HOME, 'cache');
  const templatePath = path.join(cachePath, 'alibaba-template', 'template.json');
  return fs.existsSync(templatePath) ? require(templatePath) : templateJson;
}

const first_level_template = [
  {
    name: 'Alibaba Cloud Serverless',
    value: 'Alibaba_Cloud_Serverless',
  },
  {
    name: 'AWS Cloud Serverless',
    value: 'devscomp/start-lambda',
  },
  {
    name: 'Tencent Cloud Serverless',
    value: 'devscomp/start-scf',
  },
  {
    name: 'Baidu Cloud Serverless',
    value: 'xinwuyun/start-cfc',
  },
  {
    name: 'Dev Template for Serverless Devs',
    value: 'Dev_Template_for_Serverless_Devs',
  },
];

const devs_template = [
  {
    name: 'Application Scaffolding',
    value: 'devsapp/start-application',
  },
  {
    name: 'Component Scaffolding',
    value: 'devsapp/start-component',
  },
];

function formatLang() {
  const lang = getLang();
  const langMap = {
    en: 'name_en',
    zh: 'name_zh',
  };
  return langMap[lang] || 'name_en';
}

export function GET_APPLICATION_TEMPLATE() {
  const { Body } = getTemplateData();

  const lang = formatLang();
  const ali_template = map(Body, item => ({
    name: item[lang],
    value: item.value,
  }));
  const list = [];
  let allList = concat(first_level_template, ali_template, devs_template);
  let allAliList = concat(ali_template);
  each(Body, item => {
    const templates = sortBy(item.templates, obj => obj.rank);
    const source = map(templates, obj => ({
      name: obj[lang],
      value: obj.value,
      isDeploy: obj.is_deploy,
    }));
    allList = concat(allList, source);
    allAliList = concat(allAliList, source);
    list.push({
      type: 'autocomplete',
      name: 'template',
      message: i18n('template-tip'),
      loop: true,
      when(answers) {
        return answers.ali_template_answer === item.value;
      },
      source: function (answersSoFar, input) {
        return input ? filter(source, obj => lowerCase(obj.name).indexOf(lowerCase(input)) !== -1) : source;
      },
    });
  });

  const promptData = concat(
    [
      {
        type: 'autocomplete',
        name: 'firstLevel',
        loop: true,
        message: 'Hello Serverless for Cloud Vendors',
        source: function (answersSoFar, input) {
          return input
            ? allList.filter((item: any) => lowerCase(item.name).indexOf(lowerCase(input)) !== -1)
            : first_level_template;
        },
      },
      {
        type: 'autocomplete',
        name: 'ali_template_answer',
        loop: true,
        when(answers) {
          return answers.firstLevel === 'Alibaba_Cloud_Serverless';
        },
        message: i18n('app-tip'),
        source: function (answersSoFar, input) {
          return input
            ? allAliList.filter((item: any) => lowerCase(item.name).indexOf(lowerCase(input)) !== -1)
            : ali_template;
        },
      },
    ],
    list,
    {
      type: 'autocomplete',
      name: 'template',
      message: i18n('template-tip'),
      loop: true,
      when(answers) {
        return answers.firstLevel === 'Dev_Template_for_Serverless_Devs';
      },
      source: function (answersSoFar, input) {
        return input
          ? devs_template.filter((item: any) => lowerCase(item.name).indexOf(lowerCase(input)) !== -1)
          : devs_template;
      },
    },
  );

  return {
    promptData,
    allAliList,
  };
}

export const PROJECT_NAME_INPUT = {
  type: 'input',
  name: 'projectName',
  message: 'Please input your project name (init dir)',
  validate(input) {
    return input.length > 0 ? true : 'You must provide a project name';
  },
};
