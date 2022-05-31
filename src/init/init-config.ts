import { i18n } from '../utils';
import core from '../utils/core';
const { lodash } = core;
const { lowerCase, first, concat } = lodash;

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
    name: 'Huawei Cloud Serverless',
    value: 'Huawei_Cloud_Serverless',
  },
  {
    name: 'Baidu Cloud Serverless',
    value: 'Baidu_Cloud_Serverless',
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
  {
    name: 'Plugin Scaffolding',
    value: 'devsapp/start-plugin',
  },
];

const ali_template = [
  {
    name: 'Quick start [Deploy a Hello World function to FaaS]',
    value: 'quick_start',
  },
  {
    name: 'Container example [Deploy function to FaaS with custom-container]',
    value: 'container_example',
  },
  {
    name: 'Web Framework [Deploy a web framework to FaaS]',
    value: 'web_framework',
  },
  {
    name: 'Static website [Deploy a static website]',
    value: 'static_website',
  },
  {
    name: 'Best practice [Experience serverless project]',
    value: 'best_practice',
  },
];

const quick_start_template = [
  {
    name: '[HTTP] Node.js 14',
    value: 'devsapp/start-fc-http-nodejs14',
    isDeploy: true,
  },
  {
    name: '[HTTP] Python3',
    value: 'devsapp/start-fc-http-python3',
    isDeploy: true,
  },
  {
    name: '[HTTP] Java8',
    value: 'devsapp/start-fc-http-java8',
  },
  {
    name: '[HTTP] PHP7',
    value: 'devsapp/start-fc-http-php7',
    isDeploy: true,
  },
  {
    name: '[HTTP] C++ (custom)',
    value: 'devsapp/fc-custom-cpp-http',
    isDeploy: true,
  },
  {
    name: '[Event] Node.js 14',
    value: 'devsapp/start-fc-event-nodejs14',
    isDeploy: true,
  },
  {
    name: '[Event] Python3',
    value: 'devsapp/start-fc-event-python3',
    isDeploy: true,
  },
  {
    name: '[Event] Java8',
    value: 'devsapp/start-fc-event-java8',
  },
  {
    name: '[Event] PHP7',
    value: 'devsapp/start-fc-event-php7',
    isDeploy: true,
  },
  {
    name: '[Event] Go (custom)',
    value: 'devsapp/fc-custom-golang-event',
  },
  {
    name: '[Event] Powershell (custom)',
    value: 'devsapp/fc-custom-powershell-event',
  },
  {
    name: '[Event] Typescript (custom)',
    value: 'devsapp/fc-custom-typescript-event',
  },
  {
    name: '[Event] Lua (custom)',
    value: 'devsapp/fc-custom-lua-event',
  },
  {
    name: '[Event] Ruby (custom)',
    value: 'devsapp/fc-custom-ruby-event',
  },
  {
    name: '[Event] Rust (custom)',
    value: 'devsapp/fc-custom-rust-event',
  },
  {
    name: '[Event] Dart (custom)',
    value: 'devsapp/fc-custom-dart-event',
  },
];

const container_example_template = [
  {
    name: '[HTTP] C++',
    value: 'devsapp/start-fc-custom-container-http-cpp',
  },
  {
    name: '[HTTP] Java (Springboot)',
    value: 'devsapp/start-fc-custom-container-http-springboot',
  },
  {
    name: '[HTTP] ASP.NET Core',
    value: 'devsapp/start-fc-custom-container-http-aspdotnetcore',
  },
  {
    name: '[Event] Node.js 14',
    value: 'devsapp/start-fc-custom-container-event-nodejs14',
    isDeploy: true,
  },
  {
    name: '[Event] Python3.9',
    value: 'devsapp/start-fc-custom-container-event-python3.9',
  },
  {
    name: '[Event] C++',
    value: 'devsapp/start-fc-custom-container-event-cpp',
  },
];

const web_framework_template = [
  {
    name: 'Express.js',
    value: 'devsapp/start-express',
    isDeploy: true,
  },
  {
    name: 'Egg.js',
    value: 'devsapp/start-egg',
    isDeploy: true,
  },
  {
    name: 'Koa.js',
    value: 'devsapp/start-koa',
  },
  {
    name: 'Nuxt.js (SSR)',
    value: 'devsapp/start-nuxt-ssr',
    isDeploy: true,
  },
  {
    name: 'Next.js (SSR)',
    value: 'devsapp/start-next-ssr',
    isDeploy: true,
  },
  {
    name: 'Django',
    value: 'devsapp/start-django',
    isDeploy: true,
  },
  {
    name: 'Flask',
    value: 'devsapp/start-flask',
    isDeploy: true,
  },
  {
    name: 'Tornado',
    value: 'devsapp/start-tornado',
    isDeploy: true,
  },
  {
    name: 'Springboot',
    value: 'devsapp/start-springboot',
  },
  {
    name: 'ThinkPHP',
    value: 'devsapp/start-thinkphp',
  },
  {
    name: 'Laravel',
    value: 'devsapp/start-laravel',
  },
];

const static_website_template = [
  {
    name: 'Docusaurus',
    value: 'devsapp/website-docusaurus',
    isDeploy: true,
  },
  {
    name: 'Hexo',
    value: 'devsapp/website-hexo',
    isDeploy: true,
  },
  {
    name: 'Vuepress',
    value: 'devsapp/website-vuepress',
    isDeploy: true,
  },
];

const best_practice_template = [
  {
    name: '[AI] PyTorch',
    value: 'devsapp/start-pytorch',
    isDeploy: true,
  },
  {
    name: '[AI] Tensorflow',
    value: 'devsapp/start-tensorflow',
    isDeploy: true,
  },
  {
    name: '[AI] Image Prediction',
    value: 'devsapp/image-prediction-app',
    isDeploy: true,
  },
  {
    name: '[DB] MySQL Example',
    value: 'devsapp/start-fc-mysql-python',
  },
  {
    name: '[DB] MongoDB Example',
    value: 'devsapp/start-fc-mongodb-python',
  },
  {
    name: '[DB] Redis Example',
    value: 'devsapp start-fc-redis-python',
  },
  {
    name: 'Puppeteer Example',
    value: 'devsapp/puppeteer-nodejs',
  },
  {
    name: 'FFmpeg Example',
    value: 'devsapp/ffmpeg-app',
  },
  {
    name: 'Mall admin Example',
    value: 'devsapp/start-fc-mall-admin',
  },
];
const all_ali_template = concat(
  ali_template,
  quick_start_template,
  container_example_template,
  web_framework_template,
  static_website_template,
  best_practice_template,
);

const huawei_template = [
  {
    name: 'Quick start [Deploy a Hello World function to FaaS]',
    value: 'quick_start',
  }
];

const huawei_quick_start_template = [
  {
    name: '[HTTP] Node.js 8',
    value: 'start-fg-http-nodejs',
  },
  {
    name: '[HTTP] Python3.6',
    value: 'start-fg-http-python3.6',
  },
]

const all_huawei_template = concat(
  huawei_template,
  huawei_quick_start_template,
);


const baidu_template = [
  {
    name: 'Quick start [Deploy a Hello World function to FaaS]',
    value: 'quick_start',
  }
];

const baidu_quick_start_template = [
  {
    name: '[HTTP] Node.js 12',
    value: 'start-cfc-http-nodejs12',
  },
  {
    name: '[HTTP] Python 3',
    value: 'start-cfc-http-python3',
  },
]

const all_baidu_template = concat(
  baidu_template,
  baidu_quick_start_template,
);

export const ALL_TEMPLATE = concat(first_level_template, all_ali_template, all_huawei_template, all_baidu_template, devs_template);

export const APPLICATION_TEMPLATE = [
  {
    type: 'autocomplete',
    name: 'firstLevel',
    loop: true,
    message: 'Hello Serverless for Cloud Vendors',
    default: first(first_level_template).value,
    source: async function (answersSoFar, input) {
      return input
        ? ALL_TEMPLATE.filter((item: any) => lowerCase(item.name).indexOf(lowerCase(input)) !== -1)
        : first_level_template;
    },
  },
  {
    type: 'autocomplete',
    name: 'template',
    message: i18n('template-tip'),
    default: first(devs_template).value,
    loop: true,
    when(answers) {
      return answers.firstLevel === 'Dev_Template_for_Serverless_Devs';
    },
    source: async function (answersSoFar, input) {
      return input
        ? devs_template.filter((item: any) => lowerCase(item.name).indexOf(lowerCase(input)) !== -1)
        : devs_template;
    },
  },
  {
    type: 'autocomplete',
    name: 'ali_template',
    when(answers) {
      return answers.firstLevel === 'Alibaba_Cloud_Serverless';
    },
    default: first(ali_template).value,
    message: i18n('app-tip'),
    source: async function (answersSoFar, input) {
      return input
        ? all_ali_template.filter((item: any) => lowerCase(item.name).indexOf(lowerCase(input)) !== -1)
        : ali_template;
    },
  },
  {
    type: 'autocomplete',
    name: 'huawei_template',
    when(answers) {
      return answers.firstLevel === 'Huawei_Cloud_Serverless';
    },
    default: first(huawei_template).value,
    message: i18n('app-tip'),
    source: async function (answersSoFar, input) {
      return input
        ? all_huawei_template.filter((item: any) => lowerCase(item.name).indexOf(lowerCase(input)) !== -1)
        : huawei_template;
    },
  },
  {
    type: 'autocomplete',
    name: 'template',
    loop: true,
    when(answers) {
      return answers.huawei_template === 'quick_start';
    },
    message: i18n('template-tip'),
    default: first(huawei_quick_start_template).value,
    source: async function (answersSoFar, input) {
      return input
        ? huawei_quick_start_template.filter((item: any) => lowerCase(item.name).indexOf(lowerCase(input)) !== -1)
        : huawei_quick_start_template;
    },
  },
  {
    type: 'autocomplete',
    name: 'baidu_template',
    when(answers) {
      return answers.firstLevel === 'Baidu_Cloud_Serverless';
    },
    default: first(baidu_template).value,
    message: i18n('app-tip'),
    source: async function (answersSoFar, input) {
      return input
        ? all_baidu_template.filter((item: any) => lowerCase(item.name).indexOf(lowerCase(input)) !== -1)
        : baidu_template;
    },
  },
  {
    type: 'autocomplete',
    name: 'template',
    loop: true,
    when(answers) {
      return answers.baidu_template === 'quick_start';
    },
    message: i18n('template-tip'),
    default: first(baidu_quick_start_template).value,
    source: async function (answersSoFar, input) {
      return input
        ? baidu_quick_start_template.filter((item: any) => lowerCase(item.name).indexOf(lowerCase(input)) !== -1)
        : baidu_quick_start_template;
    },
  },
  {
    type: 'autocomplete',
    name: 'template',
    loop: true,
    when(answers) {
      return answers.ali_template === 'quick_start';
    },
    message: i18n('template-tip'),
    default: first(quick_start_template).value,
    source: async function (answersSoFar, input) {
      return input
        ? quick_start_template.filter((item: any) => lowerCase(item.name).indexOf(lowerCase(input)) !== -1)
        : quick_start_template;
    },
  },
  {
    type: 'autocomplete',
    name: 'template',
    loop: true,
    when(answers) {
      return answers.ali_template === 'container_example';
    },
    message: i18n('template-tip'),
    default: first(container_example_template).value,
    source: async function (answersSoFar, input) {
      return input
        ? container_example_template.filter((item: any) => lowerCase(item.name).indexOf(lowerCase(input)) !== -1)
        : container_example_template;
    },
  },
  {
    type: 'autocomplete',
    name: 'template',
    loop: true,
    when(answers) {
      return answers.ali_template === 'web_framework';
    },
    message: i18n('template-tip'),
    default: first(web_framework_template).value,
    source: async function (answersSoFar, input) {
      return input
        ? web_framework_template.filter((item: any) => lowerCase(item.name).indexOf(lowerCase(input)) !== -1)
        : web_framework_template;
    },
  },
  {
    type: 'autocomplete',
    name: 'template',
    loop: true,
    when(answers) {
      return answers.ali_template === 'static_website';
    },
    message: i18n('template-tip'),
    default: first(static_website_template).value,
    source: async function (answersSoFar, input) {
      return input
        ? static_website_template.filter((item: any) => lowerCase(item.name).indexOf(lowerCase(input)) !== -1)
        : static_website_template;
    },
  },
  {
    type: 'autocomplete',
    name: 'template',
    loop: true,
    when(answers) {
      return answers.ali_template === 'best_practice';
    },
    message: i18n('template-tip'),
    default: first(best_practice_template).value,
    source: async function (answersSoFar, input) {
      return input
        ? best_practice_template.filter((item: any) => lowerCase(item.name).indexOf(lowerCase(input)) !== -1)
        : best_practice_template;
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
