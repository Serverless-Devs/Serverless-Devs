const {
  HLogger,
  ILogger,
  getCredential,
  help,
  commandParse,
  loadComponent,
    reportComponent
} = require('@serverless-devs/core')
const { Component } = require('@serverless-devs/s-core')
const { Scf } = require('tencent-component-toolkit')
const { ApiTypeError } = require('tencent-component-toolkit/lib/utils/error')
const { prepareInputs, prepareAliasInputs, getType, getDefaultProtocol } = require('./utils')
const CONFIGS = require('./config')

class SCFComponent extends Component {

  async deploy(inputs) {
    console.log(`Deploying ${CONFIGS.compFullname}`)
    const temp_credentials = await getCredential(inputs.project.access)
    const credentials = {
      SecretId: temp_credentials.SecretID,
      SecretKey: temp_credentials.SecretKey
    }
    const appId = temp_credentials.AccountID

    reportComponent("scf", {
      "commands": 'deploy',
      "uid": appId,
    });

    // 默认值
    const region = inputs.region || CONFIGS.region

    await this.init()
    const properties = inputs.props
    const { state } = this

    // apigateway
    if (state && state.apigw && properties.events) {
      for (let i = 0; i < properties.events.length; i++) {
        if (properties.events[i].apigw) {
          if (properties.events[i].apigw.name && state.apigw[properties.events[i].apigw.name]) {
            properties.events[i].apigw.serviceId = state.apigw[properties.events[i].apigw.name]
          }
        }
      }
      console.log(properties.events[0].apigw)
    }

 

    // prepare scf inputs parameters
    const { scfInputs, existApigwTrigger, triggers, useDefault } = await prepareInputs(
      this,
      credentials,
      appId,
      properties
    )

    const scf = new Scf(credentials, region)
    const scfOutput = await scf.deploy(scfInputs)

    const outputs = {
      functionName: scfOutput.FunctionName,
      description: scfOutput.Description,
      region: scfOutput.Region,
      namespace: scfOutput.Namespace,
      runtime: scfOutput.Runtime,
      handler: scfOutput.Handler,
      memorySize: scfOutput.MemorySize
    }

    if (scfOutput.Layers && scfOutput.Layers.length > 0) {
      outputs.layers = scfOutput.Layers.map((item) => ({
        name: item.LayerName,
        version: item.LayerVersion
      }))
    }

    // default version is $LATEST
    outputs.lastVersion = scfOutput.LastVersion
      ? scfOutput.LastVersion
      : this.state.lastVersion || '$LATEST'

    // default traffic is 1.0, it can also be 0, so we should compare to undefined
    outputs.traffic =
      scfOutput.Traffic !== undefined
        ? scfOutput.Traffic
        : this.state.traffic !== undefined
        ? this.state.traffic
        : 1

    if (outputs.traffic !== 1 && scfOutput.ConfigTrafficVersion) {
      outputs.configTrafficVersion = scfOutput.ConfigTrafficVersion
      this.state.configTrafficVersion = scfOutput.ConfigTrafficVersion
    }

    this.state.lastVersion = outputs.lastVersion
    this.state.traffic = outputs.traffic

    // handle apigw event outputs
    if (existApigwTrigger) {
      const stateApigw = {}
      scfOutput.Triggers.forEach((apigwTrigger) => {
        if (apigwTrigger.serviceId) {
          stateApigw[apigwTrigger.serviceName] = apigwTrigger.serviceId
          apigwTrigger.apiList.forEach((endpoint) => {
            if (getType(apigwTrigger.subDomain) === 'Array') {
              apigwTrigger.subDomain.forEach((item) => {
                triggers['apigw'].push(
                  `${getDefaultProtocol(apigwTrigger.protocols)}://${item}/${
                    apigwTrigger.environment
                  }${endpoint.path}`
                )
              })
            } else {
              triggers['apigw'].push(
                `${getDefaultProtocol(apigwTrigger.protocols)}://${apigwTrigger.subDomain}/${
                  apigwTrigger.environment
                }${endpoint.path}`
              )
            }
          })
        }
      })
      this.state.apigw = stateApigw
    }

    outputs.triggers = triggers

    if (useDefault) {
      outputs.templateUrl = CONFIGS.templateUrl
    }

    this.state.region = region
    this.state.function = scfOutput

    // must add this property for debuging online
    this.state.lambdaArn = scfOutput.FunctionName

    await this.save()

    console.log(`Deployed Tencent ${CONFIGS.compFullname}...`)

    return outputs
  }

  // eslint-disable-next-line
    async remove(inputs = {}) {
    // 获取密钥信息
    const credentials = {
      SecretId: temp_credentials.SecretID,
      SecretKey: temp_credentials.SecretKey
    }
    const appId = temp_credentials.AccountID

    reportComponent("scf", {
      "commands": 'remove',
      "uid": appId,
    });
    // 默认值
    await this.init()

    const { region } = this.state
    const functionInfo = this.state.function

    console.log(`Removing Tencent ${CONFIGS.compFullname}...`)
    const scf = new Scf(credentials, region)
    if (functionInfo && functionInfo.FunctionName) {
      await scf.remove(functionInfo)
    }
    this.state = {}
    console.log(`Removed Tencent ${CONFIGS.compFullname}`)
  }
}

module.exports = SCFComponent
