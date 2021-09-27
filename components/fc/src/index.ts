/* eslint-disable no-param-reassign */
import * as core from '@serverless-devs/core';
import * as _ from 'lodash';
import Logger from './common/logger';
import { COMPONENT_HELP_INFO, LOCAL_HELP_INFO, NAS_HELP_INFO,
  NAS_SUB_COMMAND_HELP_INFO, LOCAL_INVOKE_HELP_INFO, LOCAL_START_HELP_INFO, BUILD_HELP_INFO } from './lib/help';
import * as DEPLOY_HELP from './lib/help/deploy';
import transformNas, { toNasAbility } from './lib/transform-nas';
import { ICredentials } from './lib/interface/profile';
import { IInputs, IProperties } from './lib/interface/interface';
import { isLogConfig, LogsProps } from './lib/interface/sls';
import { FcInfoProps } from './lib/interface/component/fc-info';
import { FcSyncProps } from './lib/interface/component/fc-sync';
import { FcMetricsProps } from './lib/interface/component/fc-metrics';
import { getFcNames, isAutoConfig, isHttpFunction } from './lib/utils';
import * as tips from './lib/tips';
import FcStress from './lib/component/fc-stress';
import Version from './lib/component/version';
import Alias from './lib/component/alias';
import OnDemand from './lib/component/on-demand';
import Remove from './lib/component/remove';
import Provision from './lib/component/provision';
import { PayloadOption, EventTypeOption, HttpTypeOption } from './lib/interface/component/fc-common';
import { StressOption } from './lib/interface/component/fc-stress';
import * as yaml from 'js-yaml';
import BaseComponent from './common/base';
import FcProxiedInvoke from './lib/component/fc-proxied-invoke';
import * as proxied from './command/proxied';
import FcRemoteDebug from './lib/component/fc-remote-debug';
import * as remote from './command/remote';
import FcEval from './lib/component/fc-eval';
import { EvalOption } from './lib/interface/component/fc-eval';

Logger.setContent('FC');
const SUPPORTED_LOCAL_METHOD: string[] = ['invoke', 'start'];

export default class FcBaseComponent extends BaseComponent {
  logger = Logger;

  async deploy(inputs: IInputs): Promise<any> {
    const { props, args } = this.handlerComponentInputs(inputs);
    const parsedArgs: {[key: string]: any} = core.commandParse(inputs, {
      boolean: ['help'],
      alias: { help: 'h' },
    });

    const parsedData = parsedArgs?.data || {};
    const rawData = parsedData._ || [];
    const commandList = ['all', 'service', 'function', 'trigger', 'domain'];

    const subCommand = rawData[0] || 'all';
    this.logger.debug(`deploy subCommand: ${subCommand}`);
    if (!commandList.includes(subCommand)) {
      return core.help(DEPLOY_HELP.DEPLOY);
    }

    if (parsedData.help) {
      rawData[0] ? core.help(DEPLOY_HELP[`DEPLOY_${subCommand}`.toLocaleUpperCase()]) : core.help(DEPLOY_HELP.DEPLOY);
      return;
    }

    const deployRes: any = await this.componentMethodCaller(inputs, 'devsapp/fc-deploy', 'deploy', props, args);
    tips.showNextTip(args, tips.showDeployNextTips);

    console.log('\n\n');
    const result: any = {};
    if (deployRes.region) {
      result.region = deployRes.region;
    }
    if (deployRes.service) {
      result.service = {};
      if (deployRes.service.name) {
        result.service.name = deployRes.service.name;
      }
    }
    if (deployRes.function) {
      result.function = {};
      if (deployRes.function.name) {
        result.function.name = deployRes.function.name;
      }
      if (deployRes.function.runtime) {
        result.function.runtime = deployRes.function.runtime;
      }
      if (deployRes.function.handler) {
        result.function.handler = deployRes.function.handler;
      }
      if (deployRes.function.memorySize) {
        result.function.memorySize = deployRes.function.memorySize;
      }
      if (deployRes.function.timeout) {
        result.function.timeout = deployRes.function.timeout;
      }
    }
    if (deployRes.systemDomain) {
      result.url = {
        system_url: deployRes.systemDomain,
      };
    }
    if (deployRes.customDomains) {
      result.url = result.url || {};
      const temp_url = [];
      for (let i = 0; i < deployRes.customDomains.length; i++) {
        temp_url.push({
          domain: deployRes.customDomains[i].domainName,
          path: deployRes.customDomains[i].path,
        });
      }
      result.url.custom_domain = temp_url;
    }
    if (deployRes.triggers) {
      result.triggers = [];
      for (let i = 0; i < deployRes.triggers.length; i++) {
        result.triggers.push({
          type: deployRes.triggers[i].type,
          name: deployRes.triggers[i].name,
        });
      }
    }

    return result;
  }

  async remove(inputs: IInputs): Promise<any> {
    const {
      credentials,
      help,
      props,
      subCommand,
      errorMessage,
    } = await Remove.handlerInputs(inputs);

    await this.report('fc', subCommand ? `remove ${subCommand}` : 'remove', credentials?.AccountID);
    if (errorMessage) {
      throw new Error(errorMessage);
    }
    if (help) {
      return;
    }

    return await new Remove().remove({
      props,
      subCommand,
    }, this.handlerInputs(inputs));
  }

  async info(inputs: IInputs): Promise<any> {
    const { props, args } = this.handlerComponentInputs(inputs);
    if (this.isHelp(args)) {
      super.help('InfoInputsArgs');
      return;
    }
    const propsGenerator = (property: any) => {
      if (_.isEmpty(property)) { return null; }
      const res: FcInfoProps = {
        region: property?.region,
        serviceName: property?.service?.name,
      };
      if (!_.isNil(property?.function?.name)) {
        Object.assign(res, {
          functionName: property?.function?.name,
        });
      }
      if (!_.isEmpty(property?.triggers)) {
        Object.assign(res, {
          triggerNames: property?.triggers.map((t) => t.name),
        });
      }
      return res;
    };
    return await this.componentMethodCaller(inputs, 'devsapp/fc-info', 'info', propsGenerator(props), args);
  }

  async sync(inputs: IInputs): Promise<any> {
    const { props, args } = this.handlerComponentInputs(inputs);
    if (this.isHelp(args)) {
      super.help('SyncInputsArgs');
      return;
    }

    let property: undefined | FcSyncProps;

    if (!_.isEmpty(props)) {
      property = {
        region: props?.region,
        serviceName: props?.service?.name,
      };

      if (!_.isNil(props?.function?.name)) {
        property.functionName = props?.function?.name;
      }
    }

    return await this.componentMethodCaller(inputs, 'devsapp/fc-sync', 'sync', property, args);
  }

  async build(inputs: IInputs): Promise<any> {
    const { props, args, argsObj } = this.handlerComponentInputs(inputs);
    const parsedArgs: {[key: string]: any} = core.commandParse({ args, argsObj }, {
      boolean: ['help'],
      alias: { help: 'h' } });

    if (parsedArgs?.data?.help) {
      core.help(BUILD_HELP_INFO);
      return;
    }
    await this.componentMethodCaller(inputs, 'devsapp/fc-build', 'build', props, args);
    tips.showNextTip(args, tips.showBuildNextTips);
  }

  async local(inputs: IInputs): Promise<any> {
    const { props, args, argsObj } = this.handlerComponentInputs(inputs);
    const parsedArgs: {[key: string]: any} = core.commandParse({ args, argsObj }, {
      boolean: ['help'],
      alias: { help: 'h' } });
    const argsData: any = parsedArgs?.data || {};
    const nonOptionsArgs = parsedArgs.data?._;
    if (argsData?.help && nonOptionsArgs.length === 0) {
      core.help(LOCAL_HELP_INFO);
      return;
    }

    if (!nonOptionsArgs || nonOptionsArgs.length === 0) {
      this.logger.error(' Error: expects argument invoke/start.');
      // help info
      return;
    }
    const methodName: string = nonOptionsArgs[0];
    if (!SUPPORTED_LOCAL_METHOD.includes(methodName)) {
      this.logger.error(`Unsupported subcommand ${methodName} for local method, only start and invoke are supported.`);
      return;
    }
    if (argsData?.help && methodName === 'start') {
      core.help(LOCAL_START_HELP_INFO);
      return;
    }
    if (argsData?.help && methodName === 'invoke') {
      core.help(LOCAL_INVOKE_HELP_INFO);
      return;
    }
    // 删除 methodName
    const fcLocalInvokeArgs: string = args ? args.replace(methodName, '').replace(/(^\s*)|(\s*$)/g, '') : '';
    this.logger.debug(`Args of fc-info is: ${fcLocalInvokeArgs}`);

    inputs.argsObj.shift();
    console.log(inputs.argsObj);
    const localRes: any = await this.componentMethodCaller(inputs, 'devsapp/fc-local-invoke', methodName, props, fcLocalInvokeArgs);
    tips.showNextTip(args, tips.showLocalNextTips);

    return localRes;
  }

  async invoke(inputs: IInputs): Promise<any> {
    const { props, args } = this.handlerComponentInputs(inputs);
    if (this.isHelp(args)) {
      super.help('InvokeInputsArgs');
      return;
    }
    const invokePayload: FcSyncProps = {
      region: props?.region,
      serviceName: props?.service?.name,
      functionName: props?.function?.name,
    };

    await this.componentMethodCaller(inputs, 'devsapp/fc-remote-invoke', 'invoke', invokePayload, args);
  }

  async logs(inputs: IInputs): Promise<any> {
    const { props, args, argsObj } = this.handlerComponentInputs(inputs);

    const comParse: any = core.commandParse({ args, argsObj }, {
      boolean: ['help'],
      string: ['region', 'service-name', 'function-name'],
      alias: { help: 'h' },
    })?.data;
    if (comParse?.help) {
      super.help('LogsInputsArgs');
      return;
    }

    const { region, serviceName, functionName } = getFcNames(comParse, props);
    this.logger.debug(`[logs] region: ${region}, serviceName: ${serviceName}, functionName: ${functionName}`);

    let logsPayload: LogsProps;
    try {
      const { logConfig } = (await this.info({
        ...inputs,
        props: {
          region,
          service: { name: serviceName },
          // @ts-ignore
          function: { name: functionName },
        },
        args: '',
      })).service || {};

      if (!isLogConfig(logConfig)) {
        throw new Error('The service logConfig is not found online, please confirm whether logConfig is configured first, and then execute [s exec - deploy].');
      }

      logsPayload = {
        project: logConfig?.project,
        logstore: logConfig?.logstore,
        regionId: region,
        topic: serviceName,
        query: props?.function?.name,
      };
    } catch (ex) {
      if (ex.code?.endsWith('NotFound')) {
        throw new Error(`Online search failed, error message: ${ex.message}. Please execute [s exec -- deploy]`);
      }
      throw ex;
    }

    await this.componentMethodCaller(inputs, 'devsapp/sls', 'logs', logsPayload, args);
  }

  async metrics(inputs: IInputs): Promise<any> {
    const { props, args, argsObj } = this.handlerComponentInputs(inputs);

    const comParse: any = core.commandParse({ args, argsObj }, {
      boolean: ['help'],
      string: ['region', 'service-name', 'function-name'],
      alias: { help: 'h' },
    })?.data;

    if (comParse?.help) {
      super.help('MetricsInputsArgs');
      return;
    }

    const payload: FcMetricsProps = getFcNames(comParse, props);

    await this.componentMethodCaller(inputs, 'devsapp/fc-metrics', 'metrics', payload, args);
  }

  async nas(inputs: IInputs) {
    const { props, args, project, argsObj } = this.handlerComponentInputs(inputs);
    const SUPPORTED_METHOD = ['init', 'ls', 'cp', 'rm', 'download', 'upload', 'command'];

    const apts = {
      boolean: ['all', 'long', 'help', 'recursive', 'no-clobber', 'force', 'assume-yes'],
      alias: { force: 'f', 'no-clobber': 'n', recursive: 'r', help: 'h', long: 'l', 'assume-yes': 'y' },
    };
    const comParse: any = core.commandParse({ args, argsObj }, apts);
    const argsData: any = comParse?.data || {};

    const assumeYes: boolean = argsData.y || argsData['assume-yes'];
    const nonOptionsArgs = comParse.data?._ || [];
    this.logger.debug(`nonOptionsArgs is ${JSON.stringify(nonOptionsArgs)}`);
    if (!comParse?.data) {
      this.logger.error('Not found sub-command.');
      core.help(NAS_HELP_INFO);
      return;
    }

    if (nonOptionsArgs.length === 0) {
      if (!comParse?.data?.help) {
        this.logger.error('Not found sub-command.');
      }
      core.help(NAS_HELP_INFO);
      return;
    }

    const commandName: string = nonOptionsArgs[0];
    if (!SUPPORTED_METHOD.includes(commandName)) {
      this.logger.error(`Not supported sub-command: [${commandName}]`);
      core.help(NAS_HELP_INFO);
      return;
    }
    const transformArgs = args.replace(commandName, '').replace(/(^\s*)|(\s*$)/g, '');
    if (transformArgs.startsWith('cp ')) {
      throw new Error('Not supported command cp, please [s nas upload <option>]');
    }

    if (comParse?.data?.help) {
      core.help(NAS_SUB_COMMAND_HELP_INFO[commandName]);
      return;
    }
    nonOptionsArgs.shift();
    const { nasConfig, vpcConfig, name, role } = props?.service || {};
    if (commandName === 'init' && isAutoConfig(nasConfig)) {
      return await this.componentMethodCaller(inputs, 'devsapp/fc-deploy', 'deployAutoNas', props, assumeYes ? '--assume-yes' : null);
    } else if (commandName === 'init') {
      // nasConfig is not auto
      for (const mountPoint of nasConfig?.mountPoints) {
        const ensureVm = core.spinner(`Ensuring nas dir: ${mountPoint.nasDir} in mount point: ${mountPoint.serverAddr}...`);
        try {
          const payload = await toNasAbility(props?.region, vpcConfig, name, role, { userId: nasConfig?.userId, groupId: nasConfig?.groupId, nasDir: mountPoint.nasDir, mountPointDomain: mountPoint.serverAddr });
          await this.componentMethodCaller(inputs, 'devsapp/nas', 'ensureNasDir', payload.payload);
          ensureVm.succeed(`Nas dir: ${mountPoint.nasDir} in mount point: ${mountPoint.serverAddr} exists.`);
        } catch (e) {
          ensureVm.fail(`Ensure nas dir: ${mountPoint.nasDir} in mount point: ${mountPoint.serverAddr} failed.`);
          this.logger.debug(`Ensure nas dir: ${mountPoint.nasDir} in mount point: ${mountPoint.serverAddr} failed, error: ${e}`);
        }
      }
      return;
    }

    const payload = await transformNas(props, nonOptionsArgs, transformArgs, project?.access, commandName, inputs.credentials);

    this.logger.debug(`transform nas payload: ${JSON.stringify(payload.payload)}, args: ${payload.transformArgs}, command: ${commandName}`);
    await this.componentMethodCaller(inputs, 'devsapp/nas', commandName, payload.payload, payload.transformArgs);

    tips.showNasNextTips();
  }

  async stress(inputs: IInputs): Promise<any> {
    const { props, project } = this.handlerComponentInputs(inputs);
    const SUPPORTED_METHOD: string[] = ['start', 'clean'];
    const STRESS_SUB_COMMAND_HELP_KEY = {
      start: 'StressStartInputsArgs',
      clean: 'StressCleanInputsArgs',
    };

    const apts = {
      boolean: ['help', 'assume-yes'],
      alias: {
        help: 'h',
        region: 'r',
        access: 'a',
        qualifier: 'q',
        url: 'u',
        method: 'm',
        payload: 'p',
        'payload-file': 'f',
        'assume-yes': 'y',
      },
    };
    const comParse: any = core.commandParse(inputs, apts);
    const argsData: any = comParse?.data || {};
    const nonOptionsArgs = argsData?._ || [];

    this.logger.debug(`nonOptionsArgs is ${JSON.stringify(nonOptionsArgs)}`);
    if (!argsData) {
      this.logger.error('Not found sub-command.');
      super.help('StressInputsArgs');
      return;
    }
    if (nonOptionsArgs.length === 0) {
      if (!argsData?.help) {
        this.logger.error('Not found sub-command.');
      }
      super.help('StressInputsArgs');
      return;
    }

    const commandName: string = nonOptionsArgs[0];
    if (!SUPPORTED_METHOD.includes(commandName)) {
      this.logger.error(`Not supported sub-command: [${commandName}]`);
      super.help('StressInputsArgs');
      return;
    }

    if (argsData?.help) {
      super.help(STRESS_SUB_COMMAND_HELP_KEY[commandName]);
      return;
    }
    const stressOpts: StressOption = {
      functionType: argsData['function-type'] || (isHttpFunction(props) ? 'http' : 'event'),
      numUser: argsData['num-user'],
      spawnRate: argsData['spawn-rate'],
      runningTime: argsData['run-time'],
    };

    let eventTypeOpts: EventTypeOption = null;
    let httpTypeOpts: HttpTypeOption = null;
    if (stressOpts?.functionType === 'event') {
      eventTypeOpts = {
        serviceName: argsData['service-name'] || props?.service?.name,
        functionName: argsData['function-name'] || props?.function?.name,
        qualifier: argsData?.qualifier,
      };
      this.logger.debug(`Using event options: \n${yaml.dump(eventTypeOpts)}`);
    } else if (stressOpts?.functionType === 'http') {
      httpTypeOpts = {
        url: argsData?.url,
        method: argsData?.method,
      };
      this.logger.debug(`Using http options: \n${yaml.dump(httpTypeOpts)}`);
    }
    const payloadOpts: PayloadOption = {
      payloadFile: argsData['payload-file'],
      payload: argsData?.payload,
    };
    const fcStress: FcStress = new FcStress(project?.access, props?.region || argsData?.region, stressOpts, httpTypeOpts, eventTypeOpts, payloadOpts);
    let fcStressArgs: string;
    if (commandName === 'start') {
      fcStressArgs = fcStress.makeStartArgs();
    } else if (commandName === 'clean') {
      fcStressArgs = fcStress.makeCleanArgs(argsData['assume-yes']);
    }
    this.logger.debug(`Input args of fc-stress component is: ${fcStressArgs}`);
    delete inputs.argsObj;
    return await this.componentMethodCaller(inputs, 'devsapp/fc-stress', commandName, null, fcStressArgs);
  }

  async version(inputs: IInputs): Promise<any> {
    const {
      credentials,
      help,
      helpKey,
      props,
      subCommand,
      table,
      errorMessage,
    } = await Version.handlerInputs(inputs);

    await this.report('fc', subCommand ? `version ${subCommand}` : 'version', credentials?.AccountID);
    if (help) {
      super.help(helpKey);
      if (errorMessage) {
        throw new Error(errorMessage);
      }
      return;
    }

    const qualifier = new Version();
    return await qualifier[subCommand](props, table);
  }

  async alias(inputs: IInputs): Promise<any> {
    const {
      credentials,
      help,
      helpKey,
      props,
      subCommand,
      table,
      errorMessage,
    } = await Alias.handlerInputs(inputs);

    await this.report('fc', subCommand ? `alias ${subCommand}` : 'alias', credentials?.AccountID);
    if (help) {
      super.help(helpKey);
      if (errorMessage) {
        throw new Error(errorMessage);
      }
      return;
    }

    const qualifier = new Alias();
    return await qualifier[subCommand](props, table);
  }

  async provision(inputs: IInputs): Promise<any> {
    const {
      credentials,
      help,
      helpKey,
      props,
      subCommand,
      table,
      errorMessage,
    } = await Provision.handlerInputs(inputs);

    await this.report('fc', subCommand ? `provision ${subCommand}` : 'provision', credentials?.AccountID);
    if (help) {
      super.help(helpKey);
      if (errorMessage) {
        throw new Error(errorMessage);
      }
      return;
    }

    const provision = new Provision();
    return await provision[subCommand](props, table);
  }

  async onDemand(inputs: IInputs): Promise<any> {
    const {
      credentials,
      help,
      helpKey,
      props,
      subCommand,
      table,
      errorMessage,
    } = await OnDemand.handlerInputs(inputs);

    await this.report('fc', subCommand ? `onDemand ${subCommand}` : 'onDemand', credentials?.AccountID);
    if (help) {
      super.help(helpKey);
      if (errorMessage) {
        throw new Error(errorMessage);
      }
      return;
    }

    const onDemand = new OnDemand();
    return await onDemand[subCommand](props, table);
  }

  async layer(inputs: IInputs): Promise<any> {
    const { props, args, argsObj } = this.handlerComponentInputs(inputs);
    const LAYER_COMMAND = {
      publish: 'LayerPublishInputsArgs',
      list: 'LayerListInputsArgs',
      versionConfig: 'LayerVersionConfigInputsArgs',
      deleteVersion: 'LayerDeleteVerisonInputsArgs',
      versions: 'LayerVersionsInputsArgs',
      deleteLayer: 'LayerDeleteLayerInputsArgs',
    };

    const comParse: any = core.commandParse({ args, argsObj }, {
      boolean: ['help'],
      alias: { help: 'h' },
    });
    const argsData: any = comParse?.data || {};
    const nonOptionsArgs = argsData?._ || [];
    this.logger.debug(`nonOptionsArgs is ${JSON.stringify(nonOptionsArgs)}`);
    if (nonOptionsArgs.length === 0) {
      super.help('LayerInputsArgs');
      return;
    }

    const commandName: string = nonOptionsArgs[0];
    if (!LAYER_COMMAND[commandName]) {
      this.logger.error(`Not supported sub-command: [${commandName}]`);
      super.help('LayerInputsArgs');
      return;
    }

    if (argsData?.help) {
      super.help(LAYER_COMMAND[commandName]);
      return;
    }

    return await this.componentMethodCaller(inputs, 'devsapp/fc-layer', commandName, { region: props?.region }, args);
  }

  async proxied(inputs: IInputs): Promise<any> {
    const { args, argsObj } = this.handlerComponentInputs(inputs);
    const SUPPORTED_METHOD = ['setup', 'invoke', 'clean', 'cleanup'];

    const apts = {
      boolean: ['help'],
      alias: { help: 'h' },
    };
    const comParse: any = core.commandParse({ args, argsObj }, apts);
    const argsData: any = comParse?.data || {};
    const nonOptionsArgs = argsData?._ || [];
    this.logger.debug(`nonOptionsArgs is ${JSON.stringify(nonOptionsArgs)}`);
    if (argsData?.help && nonOptionsArgs.length === 0) {
      super.help('ProxiedInputsArgs');
      return;
    }
    if (nonOptionsArgs.length === 0) {
      super.help('ProxiedInputsArgs');
      return;
    }
    const methodName: string = nonOptionsArgs[0];
    if (!SUPPORTED_METHOD.includes(methodName)) {
      this.logger.error(`Not supported sub-command: [${methodName}]`);
      super.help('ProxiedInputsArgs');
      return;
    }
    const creds: ICredentials = await core.getCredential(inputs?.project?.access);
    const fcProxiedInvoke: FcProxiedInvoke = new FcProxiedInvoke(inputs);
    if (methodName === 'setup') {
      await this.report('fc', 'proxied_setup', creds?.AccountID);
      if (argsData?.help) {
        super.help('ProxiedSetupInputsArgs');
        return;
      }
      return await proxied.setup(fcProxiedInvoke.makeInputs(methodName));
    } else if (methodName === 'invoke') {
      await this.report('fc', 'proxied_invoke', creds?.AccountID);
      if (argsData?.help) {
        super.help('ProxiedInvokeInputsArgs');
        return;
      }
      return await proxied.invoke(fcProxiedInvoke.makeInputs(methodName));
    } else if (methodName === 'clean') {
      // clean
      await this.report('fc', 'proxied_clean', creds?.AccountID);
      if (argsData?.help) {
        super.help('ProxiedCleanInputsArgs');
        return;
      }
      return await proxied.clean(fcProxiedInvoke.makeInputs(methodName));
    } else {
      // cleanup
      await this.report('fc', 'proxied_cleanup', creds?.AccountID);
      if (argsData?.help) {
        super.help('ProxiedCleanupInputsArgs');
        return;
      }
      return await proxied.cleanup(fcProxiedInvoke.makeInputs(methodName));
    }
  }

  async fun2s(inputs: IInputs): Promise<any> {
    const { args } = this.handlerComponentInputs(inputs);
    const isHelp = this.isHelp(args);
    if (isHelp) {
      return super.help('Fun2SInputsArgs');
    }
    return await this.componentMethodCaller(inputs, 'fc-transform', 'fun2fc', {}, args);
  }


  async remote(inputs: IInputs): Promise<any> {
    const { args, argsObj } = this.handlerComponentInputs(inputs);
    const SUPPORTED_METHOD = ['setup', 'invoke', 'cleanup'];

    const apts = {
      boolean: ['help'],
      alias: { help: 'h' },
    };
    const comParse: any = core.commandParse({ args, argsObj }, apts);
    const argsData: any = comParse?.data || {};
    const nonOptionsArgs = argsData?._ || [];
    this.logger.debug(`nonOptionsArgs is ${JSON.stringify(nonOptionsArgs)}`);
    if (argsData?.help && nonOptionsArgs.length === 0) {
      super.help('RemoteInputsArgs');
      return;
    }
    if (nonOptionsArgs.length === 0) {
      super.help('RemoteInputsArgs');
      return;
    }
    const methodName: string = nonOptionsArgs[0];
    if (!SUPPORTED_METHOD.includes(methodName)) {
      this.logger.error(`Not supported sub-command: [${methodName}]`);
      super.help('RemoteInputsArgs');
      return;
    }
    const creds: ICredentials = await core.getCredential(inputs?.project?.access);
    const fcRemoteDebug: FcRemoteDebug = new FcRemoteDebug(inputs);
    if (methodName === 'setup') {
      await this.report('fc', 'remote_setup', creds?.AccountID);
      if (argsData?.help) {
        super.help('RemoteSetupInputsArgs');
        return;
      }
      return await remote.setup(fcRemoteDebug.makeInputs(methodName));
    } else if (methodName === 'invoke') {
      await this.report('fc', 'remote_invoke', creds?.AccountID);
      if (argsData?.help) {
        super.help('RemoteInvokeInputsArgs');
        return;
      }
      return await remote.invoke(fcRemoteDebug.makeInputs(methodName));
    } else if (methodName === 'cleanup') {
      await this.report('fc', 'remote_cleanup', creds?.AccountID);
      if (argsData?.help) {
        super.help('RemoteCleanupInputsArgs');
        return;
      }
      return await remote.cleanup(fcRemoteDebug.makeInputs(methodName));
    }
  }

  async eval(inputs: IInputs): Promise<any> {
    const { props, project } = this.handlerComponentInputs(inputs);
    const SUPPORTED_METHOD: string[] = ['start'];
    const EVAL_SUB_COMMAND_HELP_KEY = {
      start: 'EvalStartInputsArgs',
    };

    // default const args
    const DEFAULT_RUN_COUNT = 50;
    const DEFAULT_MEMORY_SIZE = '128,256,512,1024';
    const DEFAULT_RT = 250;
    const DEFAULT_CONCURRENCY_ARGS = '2,20,5';
    const DEFAULT_MEMORY = 1536;
    const DEFAULT_EVAL_TYPE = 'memory';

    const apts = {
      boolean: ['help', 'assume-yes'],
      alias: {
        help: 'h',
        region: 'r',
        access: 'a',
        'payload-file': 'f',
        'assume-yes': 'y',
      },
    };
    const comParse: any = core.commandParse(inputs, apts);
    const argsData: any = comParse?.data || {};
    const nonOptionsArgs = argsData?._ || [];

    this.logger.debug(`nonOptionsArgs is ${JSON.stringify(nonOptionsArgs)}`);
    if (!argsData) {
      this.logger.error('Not fount sub-command.');
      super.help('EvalInputsArgs');
      return;
    }
    if (nonOptionsArgs.length === 0) {
      if (!argsData?.help) {
        this.logger.error('Not fount sub-command.');
      }
      super.help('EvalInputsArgs');
      return;
    }

    const commandName: string = nonOptionsArgs[0];
    if (!SUPPORTED_METHOD.includes(commandName)) {
      this.logger.error(`Not supported sub-command: [${commandName}]`);
      super.help('EvalInputsArgs');
      return;
    }

    if (argsData?.help) {
      super.help(EVAL_SUB_COMMAND_HELP_KEY[commandName]);
      return;
    }
    const evalOpts: EvalOption = {
      serviceName: argsData['service-name'] || props?.service?.name,
      functionName: argsData['function-name'] || props?.function?.name,
      functionType: argsData['function-type'] || (isHttpFunction(props) ? 'http' : 'event'),
      evalType: argsData['eval-type'] || DEFAULT_EVAL_TYPE,
      memorySizeList: argsData['memory-size'] || DEFAULT_MEMORY_SIZE,
      runCount: argsData['run-count'] || DEFAULT_RUN_COUNT,
      rt: argsData?.rt || DEFAULT_RT,
      memory: argsData?.memory || DEFAULT_MEMORY,
      concurrencyArgs: argsData['concurrency-args'] || DEFAULT_CONCURRENCY_ARGS,
    };

    let httpTypeOpts: HttpTypeOption = null;
    if (evalOpts?.functionType === 'http') {
      httpTypeOpts = {
        url: argsData?.url,
        method: argsData?.method,
        path: argsData?.path,
        query: argsData?.query,
        body: argsData?.body,
      };
      this.logger.debug(`Using http options: \n${yaml.dump(httpTypeOpts)}`);
    }
    const payloadOpts: PayloadOption = {
      payloadFile: argsData['payload-file'],
      payload: argsData?.payload,
    };
    const fcEval: FcEval = new FcEval(project?.access, props?.region || argsData?.region,
      evalOpts, httpTypeOpts, payloadOpts);
    let fcEvalArgs: string;
    if (commandName === 'start') {
      fcEvalArgs = fcEval.makeStartArgs();
    } else {
      this.logger.error(`invalid command ${commandName}`);
      return;
    }
    this.logger.debug(`Input args of fc-eval component is: ${fcEvalArgs}`);
    delete inputs.argsObj;
    return await this.componentMethodCaller(inputs, 'devsapp/fc-eval', commandName, null, fcEvalArgs);
  }

  async help(): Promise<void> {
    await this.report('fc', 'help');
    core.help(COMPONENT_HELP_INFO);
  }

  // 解析入参
  private isHelp(args: string) {
    const comParse: any = core.commandParse({ args }, {
      boolean: ['help'],
      alias: { help: 'h' },
    });
    return comParse?.data?.help;
  }
  private handlerInputs(inputs: IInputs): any {
    const project = inputs?.project;
    const props: IProperties = inputs?.props;
    const access: string = project?.access;
    const args: string = inputs?.args;
    const argsObj: any = inputs?.argsObj;
    const curPath: any = inputs?.path;
    const projectName: string = project?.projectName;
    const appName: string = inputs?.appName;

    return {
      appName,
      projectName,
      access,
      props,
      args,
      argsObj,
      curPath,
    };
  }
  private async report(componentName: string, command: string, accountID?: string): Promise<void> {
    core.reportComponent(componentName, {
      command,
      uid: accountID,
    });
  }
  private handlerComponentInputs(inputs: IInputs, componentName?: string): any {
    const {
      appName,
      projectName,
      access,
      props,
      args,
      argsObj,
      curPath,
    } = this.handlerInputs(inputs);
    return {
      project: {
        component: componentName,
        projectName: componentName ? `${projectName}-${componentName}-project` : projectName,
        access,
      },
      appName,
      props,
      args,
      argsObj,
      path: curPath,
    };
  }

  private async componentMethodCaller(inputs: IInputs, componentName: string, methodName: string, props?: any, args?: string): Promise<any> {
    const componentInputs: any = this.handlerComponentInputs(inputs, componentName);
    await this.report(componentName, methodName, inputs?.credentials?.AccountID);
    componentInputs.props = props;
    componentInputs.args = args;
    // const componentIns: any = await core.load(`devsapp/${componentName}`);
    const componentIns: any = await core.load(`${componentName}`);
    this.logger.debug(`Inputs of component: ${componentName} is: ${JSON.stringify(componentInputs, null, '  ')}`);
    return await componentIns[methodName](componentInputs);
  }
}
