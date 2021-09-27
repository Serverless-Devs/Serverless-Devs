const { Logger, getCredential, reportComponent } = require('@serverless-devs/core');
const AWSClient = require('./utils/getClient');
const {upperFirst} = require('./utils/utils');
const {Function, EventSource} = require('./utils/handlerRequest');

class AWSComponent {
    async handlerInput(inputs, command) {
        reportComponent('lambda', {
            command,
            uid: '',
            remark: 'AWS'
        });
        const credentials = await getCredential(inputs.project.access);
        if (!(credentials.AccessKeyID || credentials.SecretAccessKey)) {
            const msg = `credentials not found. `
            throw new Error(msg)
        }

        const Properties = upperFirst(inputs.props);

        if (Properties.Function && Properties.Function.Name) {
            Properties.Function.FunctionName = Properties.Function.Name;
            delete Properties.Function.Name;
        }

        if (Properties.Function && Properties.Function.Environment && Properties.Function.Environment.Variables) {
            const variables = {}
            for (let i = 0; i < Properties.Function.Environment.Variables.length; i++) {
                variables[Properties.Function.Environment.Variables[0].Key] = Properties.Function.Environment.Variables[0].Value
            }
            Properties.Function.Environment.Variables = variables
        }

        if (Properties.Function && Properties.Function.Tags) {
            const tags = {}
            for (let i = 0; i < Properties.Function.Tags.length; i++) {
                tags[Properties.Function.Tags[0].Key] = Properties.Function.Tags[0].Value
            }
            Properties.Function.Tags = tags
        }

        if (Properties.Events) {
            const events = {}
            for (let i = 0; i < Properties.Events.length; i++) {
                events[Properties.Events[0].Name] = {
                    Type: Properties.Events[0].Type,
                    Properties: Properties.Events[0].Properties,
                }
            }
            Properties.Events = events
        }

        const awsClients = new AWSClient(credentials, Properties.Region)
        return {
            awsClients,
            credentials: credentials,
            properties: Properties,
            region: Properties.Region
        }
    }

    async deploy(inputs) {
        const {
            properties,
            awsClients,
            region
        } = await this.handlerInput(inputs, 'deploy');
        const functionName = properties.Function.FunctionName;

        const resConfig = {};

        const functionClient = new Function(awsClients);
        Logger.log(`Starting deploy of AWS Lambda "${functionName}" to the AWS region "${region}".`);
        const res = await functionClient.deploy(properties);
        resConfig.Function = {
            Name: res.FunctionName,
            Arn: res.FunctionArn
        };
        Logger.log(`Successfully deploy AWS Lambda function.`);

        const eventSourceClient = new EventSource(awsClients);
        resConfig.Event = await eventSourceClient.deploy(properties.Events, functionName, res);

        return resConfig;
    }

    async remove(inputs) {
        const {
            awsClients,
            properties,
            region
        } = await this.handlerInput(inputs, 'remove');

        const functionName = properties.Function.FunctionName;
        if (!functionName) {
            throw new Error(`FunctionName is empty.`)
        }

        const eventSourceClient = new EventSource(awsClients);
        const eventRes = await eventSourceClient.remove(properties.Events, functionName);

        Logger.log(`Starting remove of AWS Lambda "${functionName}" to the AWS region "${region}".`)
        const functionClient = new Function(awsClients);
        await functionClient.remove(properties);
        Logger.log(`Successfully remove AWS Lambda function.`)
        return {
            Region: region,
            FunctionName: {
                Name: functionName
            },
            Event: eventRes
        };
    }
}

module.exports = AWSComponent