/** @format */

import * as inquirer from 'inquirer';

const data = [
  new inquirer.Separator('\n👋 Hello Serverless for Cloud Vendors'),
  {
    key: 'alibaba',
    name: 'Alibaba Cloud Serverless',
    value: 'alibaba',
  },
  {
    key: 'aws',
    name: 'AWS Cloud Serverless',
    value: 'aws',
  },
  {
    key: 'tencent',
    name: 'Tencent Cloud Serverless',
    value: 'tencent',
  },
  new inquirer.Separator('\n🚀 DK Framework for Serverless JamStack'),
  {
    key: 'devsapp/dk-http',
    name: 'DK HTTP API',
    value: 'devsapp/dk-http',
  },
  {
    key: 'devsapp/dk-tablestore-mail',
    name: 'DK TableStore Mail',
    value: 'devsapp/dk-tablestore-mail',
  },
  // {
  //   key: 'devsapp/start-component',
  //   name: 'FullStack Website',
  //   value: 'devsapp/start-component',
  // },
  new inquirer.Separator('\n🧩 Serverless Dev Framework'),
  {
    key: 'devsapp/midway-hook-vue',
    name: 'Midway - Midway FaaS Framework',
    value: 'devsapp/midway-hook-vue',
  },
  {
    key: 'devsapp/start-malagu',
    name: 'Malagu - Malagu Framework',
    value: 'devsapp/start-malagu',
  },
  new inquirer.Separator('\n🍼 Dev Template for Serverless Devs'),
  {
    key: 'devsapp/start-application',
    name: 'Application Scaffolding',
    value: 'devsapp/start-application',
  },
  {
    key: 'devsapp/start-component',
    name: 'Component Scaffolding',
    value: 'devsapp/start-component',
  },
];

const alibaba_data = [
  new inquirer.Separator('\n👏 Event Function'),
  {
    key: 'devsapp/start-fc-event-nodejs12',
    name: 'Node.js 12 Example',
    value: 'devsapp/start-fc-event-nodejs12',
  },
  {
    key: 'devsapp/start-fc-event-nodejs10',
    name: 'Node.js 10 Example',
    value: 'devsapp/start-fc-event-nodejs10',
  },
  {
    key: 'devsapp/start-fc-event-python3',
    name: 'Python3 Example',
    value: 'devsapp/start-fc-event-python3',
  },
  {
    key: 'devsapp/start-fc-event-python2',
    name: 'Python2 Example',
    value: 'devsapp/start-fc-event-python2',
  },
  {
    key: 'devsapp/start-fc-event-php7',
    name: 'PHP7.2 Example',
    value: 'devsapp/start-fc-event-php7',
  },
  {
    key: 'devsapp/start-fc-event-java8',
    name: 'Java8 Example',
    value: 'devsapp/start-fc-event-java8',
  },
  new inquirer.Separator('\n🌏 HTTP Function'),
  {
    key: 'devsapp/start-fc-http-nodejs12',
    name: 'Node.js 12 Example',
    value: 'devsapp/start-fc-http-nodejs12',
  },
  {
    key: 'devsapp/start-fc-http-nodejs10',
    name: 'Node.js 10 Example',
    value: 'devsapp/start-fc-http-nodejs10',
  },
  {
    key: 'devsapp/start-fc-http-python3',
    name: 'Python3 Example',
    value: 'devsapp/start-fc-http-python3',
  },
  {
    key: 'devsapp/start-fc-http-python2',
    name: 'Python2 Example',
    value: 'devsapp/start-fc-http-python2',
  },
  {
    key: 'devsapp/start-fc-http-php7',
    name: 'PHP7.2 Example',
    value: 'devsapp/start-fc-http-php7',
  },
  {
    key: 'devsapp/start-fc-http-java8',
    name: 'Java8 Example',
    value: 'devsapp/start-fc-http-java8',
  },
  new inquirer.Separator('\n🚕 Project Example'),
  // {
  //   key: 'devsapp/start-fc-http-nodejs12',
  //   name: 'Chatroom - Websocket Example',
  //   value: 'devsapp/start-fc-http-nodejs12',
  // },
  {
    key: 'devsapp/todolist-app',
    name: 'TodoList - Node.js Example',
    value: 'devsapp/todolist-app',
  },
  {
    key: 'devsapp/django-blog',
    name: 'Django Blog - Python Example',
    value: 'devsapp/django-blog',
  },
  {
    key: 'devsapp/puppeteer-app',
    name: 'Puppeteer - Front-end Example',
    value: 'devsapp/puppeteer-app',
  },
  {
    key: 'devsapp/image-prediction-app',
    name: 'Image Prediction - AI Example',
    value: 'devsapp/image-prediction-app',
  },
  {
    key: 'devsapp/ffmpeg-app',
    name: 'Video Processing - Ffmpeg Example',
    value: 'devsapp/ffmpeg-app',
  },
  new inquirer.Separator('\n🚢 Web Framework Example'),
  {
    key: 'devsapp/start-express',
    name: 'Express - Node.js Framework',
    value: 'devsapp/start-express',
  },
  {
    key: 'devsapp/start-flask',
    name: 'Flask - Python Framework',
    value: 'devsapp/start-flask',
  },
  {
    key: 'devsapp/start-springboot',
    name: 'SpringBoot - Java Framework',
    value: 'devsapp/start-springboot',
  },
  {
    key: 'devsapp/start-zblog',
    name: 'Zblog - PHP Framework',
    value: 'devsapp/start-zblog',
  },

  new inquirer.Separator('\n🎡 Static Website'),
  {
    key: 'devsapp/website-vue',
    name: 'Vue - Front-end Framework',
    value: 'devsapp/website-vue',
  },
  {
    key: 'devsapp/website-react',
    name: 'React - Front-end Framework',
    value: 'devsapp/website-react',
  },
  {
    key: 'devsapp/website-docusaurus',
    name: 'Docusaurus - Static Web Framework',
    value: 'devsapp/website-docusaurus',
  },
  {
    key: 'devsapp/website-hexo',
    name: 'Hexo - Static Web Framework',
    value: 'devsapp/website-hexo',
  },
  {
    key: 'devsapp/website-vuepress',
    name: 'Vuepress - Static Web Framework',
    value: 'devsapp/website-vuepress',
  },
];

const aws_data = [
  {
    key: 'devscomp/start-lambda',
    name: 'nodejs12.x-httpe',
    value: 'devscomp/start-lambda',
  },
];

const tencent_data = [
  {
    key: 'devscomp/start-scf',
    name: 'nodejs12.x-http',
    value: 'devscomp/start-scf',
  },
];

export const APPLICATION_TEMPLATE = [
  {
    type: 'autocomplete',
    name: 'template',
    message:
        'Hello, serverlessor. Which template do you like? \nPlease select or input: ',
    loop: false,
    pageSize: 40,
    source: function (answersSoFar, input) {
      if (!input) {
        return data;
      }
      return data.filter((item: any) => item.name && item.name.indexOf(input) !== -1);
    },
  },
];

export const ALIBABA_APPLICATION_TEMPLATE = [
  {
    type: 'autocomplete',
    name: 'template',
    message: ' Which Alibaba Cloud Serverless template do you like? \nPlease select or input: ',
    loop: false,
    pageSize: 40,
    source: function (answersSoFar, input) {
      if (!input) {
        return alibaba_data;
      }
      return alibaba_data.filter((item: any) => item.name && item.name.indexOf(input) !== -1);
    },
  },
];

export const TENCENT_APPLICATION_TEMPLATE = [
  {
    type: 'autocomplete',
    name: 'template',
    message: ' Which Tencent Cloud Serverless template do you like? \nPlease select or input: ',
    loop: false,
    pageSize: 40,
    source: function (answersSoFar, input) {
      if (!input) {
        return tencent_data;
      }
      return tencent_data.filter((item: any) => item.name && item.name.indexOf(input) !== -1);
    },
  },
];

export const AWS_APPLICATION_TEMPLATE = [
  {
    type: 'autocomplete',
    name: 'template',
    message: ' Which AWS Cloud Serverless template do you like? \nPlease select or input: ',
    loop: false,
    pageSize: 40,
    source: function (answersSoFar, input) {
      if (!input) {
        return aws_data;
      }
      return aws_data.filter((item: any) => item.name && item.name.indexOf(input) !== -1);
    },
  },
];

export const PROJECT_NAME_INPUT = [
  {
    type: 'input',
    name: 'projectName',
    message: 'Please input your project name (init dir)',
  },
];
