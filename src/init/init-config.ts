/** @format */

import { lowerCase } from 'lodash';
const fist_level_template = [
  {
    name: 'fc-runtime-starter - 快速部署一个FC函数',
    value: 'fc-runtime-starter',
  },
  {
    name: 'fc-custom-container-stater - 快速部署一个custom-container应用',
    value: 'fc-custom-container-stater',
  },
  {
    name: 'Web 框架',
    value: 'web',
  },
  {
    name: '静态网站',
    value: 'static-site',
  },
  {
    name: 'Serverless 最佳实践',
    value: 'best-practice',
  },
  {
    name: 'Serverless Devs开发模板',
    value: 'devs-template',
  },
];

const fc_runtime_starter_template = [
  {
    name: 'fc-http-nodejs - 快速部署一个 nodejs12 函数',
    value: 'devsapp/start-fc-http-nodejs12',
  },
  {
    name: 'fc-http-python - 快速部署一个 python3 函数',
    value: 'devsapp/start-fc-http-python3',
  },
  {
    name: 'fc-http-java - 快速部署一个 java8 函数',
    value: 'devsapp/start-fc-http-java8',
  },
];

const fc_custom_container_stater_template = [
  {
    name: 'fc-custom-container-event-python3  - 快速部署一个事件类型python3应用',
    value: 'devsapp/start-fc-custom-container-event-python3.9',
  },
  {
    name: 'fc-custom-container-event-cpp - 快速部署一个事件类型cpp应用',
    value: 'devsapp/start-fc-custom-container-event-cpp',
  },
  {
    name: 'fc-custom-container-http-springboot - 快速部署一个HTTP类型springboot应用',
    value: 'devsapp/start-fc-custom-container-http-springboot',
  },
  {
    name: 'fc-custom-container-http-aspdotnetcore - 快速部署一个HTTP类型aspdotnetcore应用',
    value: 'devsapp/start-fc-custom-container-http-aspdotnetcore',
  },
];

const web_template = [
  {
    name: 'express-starter 快速部署一个 express 基础应用',
    value: 'devsapp/start-express',
  },
  {
    name: 'koa-starter 快速部署一个 koa 基础应用',
    value: 'devsapp/start-koa',
  },
  {
    name: 'nuxtjs-starter 快速部署一个 nuxtjs 基础应用',
    value: 'devsapp/start-nuxt',
  },
  {
    name: 'eggjs-starter 快速部署一个 eggjs 基础应用',
    value: 'devsapp/start-egg',
  },
  {
    name: 'flask-starter 快速部署一个 flask 基础应用',
    value: 'devsapp/start-flask',
  },
  {
    name: 'SpringBoot-starter 快速部署一个 SpringBoot 基础应用',
    value: 'devsapp/start-springboot',
  },
  {
    name: 'Zblog-starter 快速部署一个 Zblog 基础应用',
    value: 'devsapp/start-zblog',
  },
];

const static_site_template = [
  {
    name: 'website-starter - 快速部署一个静态网站',
    value: 'devsapp/website-base',
  },
  {
    name: 'react-starter  - 快速部署一个 React.js 应用',
    value: 'devsapp/website-react',
  },
  {
    name: 'vue-starter - 快速部署一个 Vue.js 应用',
    value: 'devsapp/website-vue',
  },
];

const best_practice_template = [
  {
    name: 'puppeteer - 基于 puppeteer 截图的 Web 应用',
    value: 'devsapp/puppeteer-app',
  },
  {
    name: 'ffmpeg  - 基于 ffmpeg 实现音视频处理应用',
    value: 'devsapp/ffmpeg-app',
  },
  {
    name: 'pdf2Img - pdf转图片应用',
    value: 'devsapp/start-pdf2img',
  },
  {
    name: 'tensorflow - 玩转tensorflow应用',
    value: 'devsapp/start-tensorflow',
  },
  {
    name: 'todoList - nodejs的网页TodoList应',
    value: 'devsapp/todolist-app',
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

const all_template = []
  .concat(fist_level_template)
  .concat(fc_runtime_starter_template)
  .concat(fc_custom_container_stater_template)
  .concat(web_template)
  .concat(static_site_template)
  .concat(best_practice_template)
  .concat(devs_template);

export const APPLICATION_TEMPLATE = [
  {
    type: 'autocomplete',
    name: 'firstLevel',
    loop: true,
    message: 'Hello, serverlesser. Which template do you like?',
    source: function (answersSoFar, input) {
      return input
        ? all_template.filter((item: any) => lowerCase(item.name).indexOf(lowerCase(input)) !== -1)
        : fist_level_template;
    },
  },
  {
    type: 'autocomplete',
    name: 'template',
    message: 'Which template do you like?',
    loop: true,
    when(answers) {
      return answers.firstLevel === 'fc-runtime-starter';
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
    message: 'Which template do you like?',
    loop: true,
    when(answers) {
      return answers.firstLevel === 'fc-custom-container-stater';
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
    message: 'Which template do you like?',
    loop: true,
    when(answers) {
      return answers.firstLevel === 'web';
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
    message: 'Which template do you like?',
    loop: true,
    when(answers) {
      return answers.firstLevel === 'static-site';
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
    message: 'Which template do you like?',
    loop: true,
    when(answers) {
      return answers.firstLevel === 'best-practice';
    },
    source: function (answersSoFar, input) {
      return input
        ? best_practice_template.filter((item: any) => lowerCase(item.name).indexOf(lowerCase(input)) !== -1)
        : best_practice_template;
    },
  },
  {
    type: 'autocomplete',
    name: 'template',
    message: 'Which template do you like?',
    loop: true,
    when(answers) {
      return answers.firstLevel === 'devs-template';
    },
    source: function (answersSoFar, input) {
      return input
        ? devs_template.filter((item: any) => lowerCase(item.name).indexOf(lowerCase(input)) !== -1)
        : devs_template;
    },
  },
];

export const PROJECT_NAME_INPUT = [
  {
    type: 'input',
    name: 'projectName',
    message: 'Please input your project name (init dir)',
    validate(input) {
      return input.length > 0 ? true : 'You must provide a project name';
    },
  },
];
