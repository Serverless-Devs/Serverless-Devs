import { lowerCase, first, concat } from 'lodash';

export const first_level_template = [
  {
    name: 'Alibaba Cloud Serverless',
    value: 'Alibaba_Cloud_Serverless',
  },
  {
    name: 'AWS Cloud Serverless',
    value: 'devsapp/start-lambda',
  },
  {
    name: 'Tencent Cloud Serverless',
    value: 'devsapp/start-scf',
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
    value: 'start-application-v3',
  },
  {
    name: 'Component Scaffolding',
    value: 'start-component-v3',
  },
  {
    name: 'Plugin Scaffolding',
    value: 'start-plugin-v3',
  },
];

export const ali_default = {
  ali_template: [
    {
      name: 'Quick start [Deploy a Hello World function to FaaS]',
      value: 'quick_start',
    },
    {
      name: 'Custom runtime example [Deploy function to FaaS with custom runtime]',
      value: 'custom_runtime',
    },
    {
      name: 'Container example [Deploy function to FaaS with custom-container]',
      value: 'container_example',
    },
    {
      name: 'Custom domain example [Deploy function to FaaS with custom domain]',
      value: 'custom_domain',
    },
  ],
  contents: {
    quick_start: [
      {
        name: 'Node.js',
        value: 'start-fc3-nodejs',
      },
      {
        name: 'Python3',
        value: 'start-fc3-python',
      },
      {
        name: 'Java',
        value: 'start-fc3-java',
      },
      {
        name: 'Go',
        value: 'start-fc3-golang',
      },
      {
        name: 'Dotnet',
        value: 'start-fc3-dotnetcore',
      },
    ],
    custom_runtime: [
      {
        name: 'Node.js',
        value: 'start-fc3-custom-nodejs',
      },
      {
        name: 'Python3',
        value: 'start-fc3-custom-python',
      },
      {
        name: 'Java',
        value: 'start-fc3-custom-java',
      },
      {
        name: 'Go',
        value: 'start-fc3-custom-golang',
      },
    ],
    container_example: [
      {
        name: 'Node.js',
        value: 'start-fc3-custom-container-nodejs',
      },
      {
        name: 'Python3',
        value: 'start-fc3-custom-container-python',
      },
      {
        name: 'Java',
        value: 'start-fc3-custom-container-java',
      },
      {
        name: 'Go',
        value: 'start-fc3-custom-container-golang',
      },
    ],
    custom_domain: [
      {
        name: 'default',
        value: 'fc-custom-domain',
      },
    ],
  },
  version: '0.0.5',
};

const huawei_template = [
  {
    name: 'Quick start [Deploy a Hello World function to FaaS]',
    value: 'quick_start',
  },
];

const huawei_quick_start_template = [
  {
    name: '[HTTP] Node.js 18',
    value: 'start-fg-http-nodejs18',
  },
  {
    name: '[HTTP] Node.js 16',
    value: 'start-fg-http-nodejs16',
  },
  {
    name: '[HTTP] Node.js 14',
    value: 'start-fg-http-nodejs14',
  },
  {
    name: '[HTTP] Python3',
    value: 'start-fg-http-python3',
  },
  {
    name: '[Event] Node.js 18',
    value: 'start-fg-event-nodejs18',
  },
  {
    name: '[Event] Node.js 16',
    value: 'start-fg-event-nodejs16',
  },
  {
    name: '[Event] Node.js 14',
    value: 'start-fg-event-nodejs14',
  },
  {
    name: '[Event] Python3',
    value: 'start-fg-event-python3',
  },
];

const all_huawei_template = concat(huawei_template, huawei_quick_start_template);

const baidu_template = [
  {
    name: 'Quick start [Deploy a Hello World function to FaaS]',
    value: 'quick_start',
  },
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
];

const all_baidu_template = concat(baidu_template, baidu_quick_start_template);

export const ALL_TEMPLATE = concat(first_level_template, all_huawei_template, all_baidu_template, devs_template);

export const APPLICATION_TEMPLATE = [
  {
    type: 'autocomplete',
    name: 'template',
    message: 'Which template do you like?',
    default: first(devs_template).value,
    loop: true,
    when(answers) {
      return answers.firstLevel === 'Dev_Template_for_Serverless_Devs';
    },
    source: async function (_answersSoFar, input) {
      if (input) {
        return devs_template.filter((item: any) => lowerCase(item.name).includes(lowerCase(input)));
      }
      return devs_template;
    },
  },
  {
    type: 'autocomplete',
    name: 'huawei_template',
    when(answers) {
      return answers.firstLevel === 'Huawei_Cloud_Serverless';
    },
    default: first(huawei_template).value,
    message: 'Hello, serverlesser. Which template do you like?',
    source: async function (_answersSoFar, input) {
      if (input) {
        return all_huawei_template.filter((item: any) => lowerCase(item.name).includes(lowerCase(input)));
      }
      return huawei_template;
    },
  },
  {
    type: 'autocomplete',
    name: 'template',
    loop: true,
    when(answers) {
      return answers.huawei_template === 'quick_start';
    },
    message: 'Which template do you like?',
    default: first(huawei_quick_start_template).value,
    source: async function (_answersSoFar, input) {
      if (input) {
        return huawei_quick_start_template.filter((item: any) => lowerCase(item.name).includes(lowerCase(input)));
      }
      return huawei_quick_start_template;
    },
  },
  {
    type: 'autocomplete',
    name: 'baidu_template',
    when(answers) {
      return answers.firstLevel === 'Baidu_Cloud_Serverless';
    },
    default: first(baidu_template).value,
    message: 'Hello, serverlesser. Which template do you like?',
    source: async function (_answersSoFar, input) {
      if (input) {
        return all_baidu_template.filter((item: any) => lowerCase(item.name).includes(lowerCase(input)));
      }
      return baidu_template;
    },
  },
  {
    type: 'autocomplete',
    name: 'template',
    loop: true,
    when(answers) {
      return answers.baidu_template === 'quick_start';
    },
    message: 'Which template do you like?',
    default: first(baidu_quick_start_template).value,
    source: async function (_answersSoFar, input) {
      if (input) {
        return baidu_quick_start_template.filter((item: any) => lowerCase(item.name).includes(lowerCase(input)));
      }
      return baidu_quick_start_template;
    },
  },
];
