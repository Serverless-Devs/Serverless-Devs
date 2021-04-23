import * as inquirer from 'inquirer';
import i18n from '../utils/i18n';



const data = [new inquirer.Separator('\n⊙ Hello World Example'), {
    key: 'devsapp/start-fc',
    name: 'Aliyun FC node.js12-http         (s init devsapp/start-fc)',
    value: 'devsapp/start-fc'
}, {
    key: 'devscomp/start-lambda',
    name: 'AWS Lambda nodejs12.x-http       (s init devscomp/start-lambda)',
    value: 'devscomp/start-lambda'
}, {
    key: 'devscomp/start-scf',
    name: 'Tencent SCF nodejs12.x-http      (s init devscomp/start-scf)',
    value: 'devscomp/start-scf'
},
new inquirer.Separator('\n⊙ Web Framework Example'),
{
    key: 'devsapp/start-express',
    name: 'Express                 (s init devsapp/start-express)',
    value: 'devsapp/start-express'
}, {
    key: 'devsapp/start-flask',
    name: 'Flask                   (s init devsapp/start-flask)',
    value: 'devsapp/start-flask'
}, {
    key: 'devsapp/start-zblog',
    name: 'Zblog                   (s init devsapp/start-zblog)',
    value: 'devsapp/start-zblog'
}, {
    key: 'devsapp/midway-hook-vue',
    name: 'Midway                  (s init devsapp/midway-hook-vue)',
    value: 'devsapp/midway-hook-vue'
}, {
    key: 'devsapp/start-malagu',
    name: 'Malagu                  (s init devsapp/start-malagu)',
    value: 'devsapp/start-malagu'
}, new inquirer.Separator('\n⊙ Static Website'), {
    key: 'devsapp/start-vue',
    name: 'Vue                   (s init devsapp/start-vue)',
    value: 'devsapp/start-vue'
}, {
    key: 'devsapp/start-react',
    name: 'React                 (s init devsapp/start-react)',
    value: 'devsapp/start-react'
}, {
    key: 'devsapp/start-docusaurus',
    name: 'Docusaurus            (s init devsapp/start-docusaurus)',
    value: 'devsapp/start-docusaurus'
}, {
    key: 'devsapp/start-hexo',
    name: 'Hexo                  (s init devsapp/start-hexo)',
    value: 'devsapp/start-hexo'
}, {
    key: 'devsapp/start-vuepress',
    name: 'Vuepress              (s init devsapp/start-vuepress)',
    value: 'devsapp/start-vuepress'
}, new inquirer.Separator('\n⊙ Serverless Dev template'), {
    key: 'devsapp/start-application',
    name: 'Application      (s init devsapp/start-application)',
    value: 'devsapp/start-application'
}, {
    key: 'devsapp/start-component',
    name: 'Component        (s init devsapp/start-component)',
    value: 'devsapp/start-component'
}];

export const APPLICATION_TEMPLATE = [
    {
        type: 'autocomplete',
        name: 'application',
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