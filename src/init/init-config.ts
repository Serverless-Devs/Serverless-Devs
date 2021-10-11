/** @format */

import { lowerCase } from 'lodash';
import { i18n } from '../utils';

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

const ali_template = [
  {
    name: i18n('fc-runtime-starter'),
    value: 'fc-runtime-starter',
  },
  {
    name: i18n('fc-custom-container-stater'),
    value: 'fc-custom-container-stater',
  },
  {
    name: i18n('web'),
    value: 'web',
  },
  {
    name: i18n('static-site'),
    value: 'static-site',
  },
  {
    name: i18n('best-practice'),
    value: 'best-practice',
  },
];

const fc_runtime_starter_template = [
  {
    name: i18n('fc-http-nodejs'),
    value: 'devsapp/start-fc-http-nodejs12',
  },
  {
    name: i18n('fc-http-python'),
    value: 'devsapp/start-fc-http-python3',
  },
  {
    name: i18n('fc-http-java'),
    value: 'devsapp/start-fc-http-java8',
  },
];

const fc_custom_container_stater_template = [
  {
    name: i18n('fc-custom-container-event-python3'),
    value: 'devsapp/start-fc-custom-container-event-python3.9',
  },
  {
    name: i18n('fc-custom-container-event-cpp'),
    value: 'devsapp/start-fc-custom-container-event-cpp',
  },
  {
    name: i18n('fc-custom-container-http-springboot'),
    value: 'devsapp/start-fc-custom-container-http-springboot',
  },
  {
    name: i18n('fc-custom-container-http-aspdotnetcore'),
    value: 'devsapp/start-fc-custom-container-http-aspdotnetcore',
  },
];

const web_template = [
  {
    name: i18n('express-starter'),
    value: 'devsapp/start-express',
  },
  {
    name: i18n('koa-starter'),
    value: 'devsapp/start-koa',
  },
  {
    name: i18n('nuxtjs-starter'),
    value: 'devsapp/start-nuxt',
  },
  {
    name: i18n('eggjs-starter'),
    value: 'devsapp/start-egg',
  },
  {
    name: i18n('flask-starter'),
    value: 'devsapp/start-flask',
  },
  {
    name: i18n('SpringBoot-starter'),
    value: 'devsapp/start-springboot',
  },
  {
    name: i18n('Zblog-starter'),
    value: 'devsapp/start-zblog',
  },
];

const static_site_template = [
  {
    name: i18n('website-starter'),
    value: 'devsapp/website-base',
  },
  {
    name: i18n('react-starter'),
    value: 'devsapp/website-react',
  },
  {
    name: i18n('vue-starter'),
    value: 'devsapp/website-vue',
  },
];

const best_practice_template = [
  {
    name: i18n('puppeteer'),
    value: 'devsapp/puppeteer-app',
  },
  {
    name: i18n('ffmpeg'),
    value: 'devsapp/ffmpeg-app',
  },
  {
    name: i18n('pdf2Img'),
    value: 'devsapp/start-pdf2img',
  },
  {
    name: i18n('tensorflow'),
    value: 'devsapp/start-tensorflow',
  },
  {
    name: i18n('todoList'),
    value: 'devsapp/todolist-app',
  },
];

export const ALI_TEMPLATE_APPLICATION = fc_runtime_starter_template.concat(
  fc_runtime_starter_template,
  fc_custom_container_stater_template,
  web_template,
  static_site_template,
  best_practice_template,
);

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

const all_template = first_level_template.concat(
  ali_template,
  fc_runtime_starter_template,
  fc_custom_container_stater_template,
  web_template,
  static_site_template,
  best_practice_template,
  devs_template,
);

export const APPLICATION_TEMPLATE = [
  {
    type: 'autocomplete',
    name: 'firstLevel',
    loop: true,
    message: 'Hello Serverless for Cloud Vendors',
    source: function (answersSoFar, input) {
      return input
        ? all_template.filter((item: any) => lowerCase(item.name).indexOf(lowerCase(input)) !== -1)
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
        ? all_template.filter((item: any) => lowerCase(item.name).indexOf(lowerCase(input)) !== -1)
        : ali_template;
    },
  },
  {
    type: 'autocomplete',
    name: 'template',
    message: i18n('template-tip'),
    loop: true,
    when(answers) {
      return answers.ali_template_answer === 'fc-runtime-starter';
    },
    source: function (answersSoFar, input) {
      return input
        ? fc_runtime_starter_template.filter((item: any) => lowerCase(item.name).indexOf(lowerCase(input)) !== -1)
        : fc_runtime_starter_template;
    },
  },
  {
    type: 'autocomplete',
    name: 'template',
    message: i18n('template-tip'),
    loop: true,
    when(answers) {
      return answers.ali_template_answer === 'fc-custom-container-stater';
    },
    source: function (answersSoFar, input) {
      return input
        ? fc_custom_container_stater_template.filter(
            (item: any) => lowerCase(item.name).indexOf(lowerCase(input)) !== -1,
          )
        : fc_custom_container_stater_template;
    },
  },
  {
    type: 'autocomplete',
    name: 'template',
    message: i18n('template-tip'),
    loop: true,
    when(answers) {
      return answers.ali_template_answer === 'web';
    },
    source: function (answersSoFar, input) {
      return input
        ? web_template.filter((item: any) => lowerCase(item.name).indexOf(lowerCase(input)) !== -1)
        : web_template;
    },
  },
  {
    type: 'autocomplete',
    name: 'template',
    message: i18n('template-tip'),
    loop: true,
    when(answers) {
      return answers.ali_template_answer === 'static-site';
    },
    source: function (answersSoFar, input) {
      return input
        ? static_site_template.filter((item: any) => lowerCase(item.name).indexOf(lowerCase(input)) !== -1)
        : static_site_template;
    },
  },
  {
    type: 'autocomplete',
    name: 'template',
    message: i18n('template-tip'),
    loop: true,
    when(answers) {
      return answers.ali_template_answer === 'best-practice';
    },
    source: function (answersSoFar, input) {
      return input
        ? best_practice_template.filter((item: any) => lowerCase(item.name).indexOf(lowerCase(input)) !== -1)
        : best_practice_template;
    },
  },
  {
    type: 'autocomplete',
    name: 'devTemplate',
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
];

export const PROJECT_NAME_INPUT = {
  type: 'input',
  name: 'projectName',
  message: 'Please input your project name (init dir)',
  validate(input) {
    return input.length > 0 ? true : 'You must provide a project name';
  },
};
