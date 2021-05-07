import * as inquirer from 'inquirer';
import i18n from '../utils/i18n';



const data = [new inquirer.Separator('\n⊙ Hello World Example'), {
    key: 'devsapp/start-fc',
    name: 'Aliyun FC node.js12-http',
    value: 'devsapp/start-fc'
}, {
    key: 'devscomp/start-lambda',
    name: 'AWS Lambda nodejs12.x-http',
    value: 'devscomp/start-lambda'
}, {
    key: 'devscomp/start-scf',
    name: 'Tencent SCF nodejs12.x-http',
    value: 'devscomp/start-scf'
},
new inquirer.Separator('\n⊙ Web Framework Example'),
{
    key: 'devsapp/start-express',
    name: 'Express',
    value: 'devsapp/start-express'
}, {
    key: 'devsapp/start-flask',
    name: 'Flask',
    value: 'devsapp/start-flask'
}, {
    key: 'devsapp/start-zblog',
    name: 'Zblog',
    value: 'devsapp/start-zblog'
}, {
    key: 'devsapp/midway-hook-vue',
    name: 'Midway',
    value: 'devsapp/midway-hook-vue'
}, {
    key: 'devsapp/start-malagu',
    name: 'Malagu',
    value: 'devsapp/start-malagu'
}, new inquirer.Separator('\n⊙ Static Website'),
{
    key: 'devsapp/website-vue',
    name: 'Vue',
    value: 'devsapp/website-vue'
}, {
    key: 'devsapp/website-react',
    name: 'React',
    value: 'devsapp/website-react'
}, {
    key: 'devsapp/website-docusaurus',
    name: 'Docusaurus',
    value: 'devsapp/website-docusaurus'
}, {
    key: 'devsapp/website-hexo',
    name: 'Hexo',
    value: 'devsapp/website-hexo'
}, {
    key: 'devsapp/website-vuepress',
    name: 'Vuepress',
    value: 'devsapp/website-vuepress'
}, new inquirer.Separator('\n⊙ Serverless Dev template'), {
    key: 'devsapp/start-application',
    name: 'Application',
    value: 'devsapp/start-application'
}, {
    key: 'devsapp/start-component',
    name: 'Component',
    value: 'devsapp/start-component'
}];

export const APPLICATION_TEMPLATE = [
    {
        type: 'autocomplete',
        name: 'template',
        message: i18n.__('Hello, serverlessor.Which template do you like?'),
        loop: false,
        pageSize: 40,
        source: function (answersSoFar, input) {
            if (!input) {
                return data;
            }
            return data.filter((item: any) => item.name && item.name.indexOf(input) !== -1);
        }
    }];

export const PROJECT_NAME_INPUT = [
    {
        type: 'input',
        name: 'projectName',
        message: i18n.__('Please input your project name'),
    }
]