

import i18n from './i18n';
export const DEFAULT_REGIRSTRY = 'https://api.github.com/repos';
export const DEFAULT_REPO = 'Serverless-Devs-Awesome';
export const APPLICATION_TEMPLATE = [
    {
        type: 'list',
        name: 'application',
        message: i18n.__('Please select an application template'),
        choices: [{
            key: 'express-alibaba-application',
            name: 'express for alibaba',
            value: 'Serverless-Devs-Awesome/express-alibaba-application'
        },{
            key: 'egg-alibaba-application',
            name: 'egg for alibaba',
            value: 'Serverless-Devs-Awesome/egg-alibaba-application'
        },{
            key: 'Next.JS-alibaba-application',
            name: 'Next.js for alibaba',
            value: 'Serverless-Devs-Awesome/Next.JS-alibaba-application'
        },{
            key: 'Nuxt.JS-alibaba-application',
            name: 'Nuxt.js for alibaba',
            value: 'Serverless-Devs-Awesome/Nuxt.JS-alibaba-application'
        },{
            key: 'koa-alibaba-application',
            name: 'koa for alibaba',
            value: 'Serverless-Devs-Awesome/koa-alibaba-application'
        },{
            key: 'bottle-alibaba-application',
            name: 'bottle for alibaba',
            value: 'Serverless-Devs-Awesome/bottle-alibaba-application'
        },{
            key: 'flask-alibaba-application',
            name: 'flask for alibaba',
            value: 'Serverless-Devs-Awesome/flask-alibaba-application'
        },{
            key: 'webpy-alibaba-application',
            name: 'webpy for alibaba',
            value: 'Serverless-Devs-Awesome/webpy-alibaba-application'
        },{
            key: 'tornado-alibaba-application',
            name: 'tornado for alibaba',
            value: 'Serverless-Devs-Awesome/tornado-alibaba-application'
        }],
    }];