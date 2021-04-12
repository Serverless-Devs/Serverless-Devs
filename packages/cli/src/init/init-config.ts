import * as inquirer from 'inquirer';
import i18n from '../utils/i18n';

export const DEFAULT_REGIRSTRY = 'https://api.github.com/repos';

const data = [new inquirer.Separator('\n⊙ Hello World Example'), {
    key: 'https://download.registry.serverlessfans.cn/init/alibaba-node.js12-http',
    name: '💎 Aliyun FC node.js12-http',
    value: 'https://download.registry.serverlessfans.cn/init/alibaba-node.js12-http'
}, {
    key: 'https://download.registry.serverlessfans.cn/init/aws-nodejs12.x-http',
    name: '💎 AWS Lambda nodejs12.x-http',
    value: 'https://download.registry.serverlessfans.cn/init/aws-nodejs12.x-http'
}, {
    key: 'https://download.registry.serverlessfans.cn/init/tencent-node.js12.16-http',
    name: '💎 Tencent SCF nodejs12.x-http',
    value: 'https://download.registry.serverlessfans.cn/init/tencent-node.js12.16-http'
},
new inquirer.Separator('\n⊙ Web Framework Example'),
{
    key: 'https://download.registry.serverlessfans.cn/init/alibaba-express-app',
    name: '🔥 Aliyun Express',
    value: 'https://download.registry.serverlessfans.cn/init/alibaba-express-app'
}, {
    key: 'https://download.registry.serverlessfans.cn/init/alibaba-flask-app',
    name: '🔥 Aliyun Flask',
    value: 'https://download.registry.serverlessfans.cn/init/alibaba-flask-app'
}, {
    key: 'https://download.registry.serverlessfans.cn/init/alibaba-midway-faas',
    name: '🔥 Midway-FaaS',
    value: 'https://download.registry.serverlessfans.cn/init/alibaba-midway-faas'
}, new inquirer.Separator('\n⊙ Serverless Dev template'), {
    key: 'https://download.registry.serverlessfans.cn/init/application',
    name: '🐂 Application',
    value: 'https://download.registry.serverlessfans.cn/init/application'
}, {
    key: 'https://download.registry.serverlessfans.cn/init/component',
    name: '🐂 Component',
    value: 'https://download.registry.serverlessfans.cn/init/component'
}, {
    key: 'https://download.registry.serverlessfans.cn/init/plugin',
    name: '🐂 Plugin',
    value: 'https://download.registry.serverlessfans.cn/init/plugin'
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