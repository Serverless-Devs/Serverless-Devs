/** @format */

export function getSubcommand(configData: any): string[] {
  const edition = configData.edition || '0.0.1';
  if (edition === '0.0.1') {
    return Object.keys(configData).filter(key => key !== 'Global');
  }
  const commands = configData.services || {};
  return Object.keys(commands);
}

export function getServiceConfig(configData: any, serviceName: string): string[] {
  const edition = configData.edition || '0.0.1';
  if (edition === '0.0.1') {
    return configData[serviceName];
  }
  const serviceMap = configData.services || {};
  const serviceDetail = serviceMap[serviceName];
  const provider = serviceDetail.provider ? serviceDetail.provider : configData.provider;
  const access = serviceDetail.access ? serviceDetail.access : configData.access;
  const assembledServiceDetail = Object.assign({}, serviceDetail, { access, provider });
  return assembledServiceDetail;
}

export function getServiceConfigDetail(configData: any) {
  const name = configData.Component || configData.component;
  const provider = configData.Provider || configData.provider;
  const access = configData.Access || configData.access || 'default';
  const autoCredential = configData.autoCredential;
  return { name, provider, access, autoCredential };
}

export function getServiceInputs(configData: any, version: string, options: any) {
  if (version === '0.0.1') {
    const { Properties, Params, Provider, Access, Component, ProjectName } = configData;
    const { credentials, method } = options;
    const inputs = {
      Properties,
      Credentials: credentials,
      Project: {
        ProjectName,
        Component,
        Provider,
        AccessAlias: Access || '',
      },
      Command: method,
      Args: Params || '',
      Path: {
        ConfigPath: process.env.templateFile || '',
      },
    };
    return inputs;
  }
  const { props, params, provider, access, component, ProjectName, appName } = configData;
  const { credentials, method } = options;
  const inputs = {
    props,
    Properties: props,
    Credentials: credentials,
    credentials: credentials,
    appName: appName,

    Project: {
      ProjectName,
      projectName: ProjectName,
      component,
      Component: component,
      provider,
      Provider: provider,
      accessAlias: access || '',
      AccessAlias: access || '',
    },
    project: {
      component,
      access: access || '',
      projectName: ProjectName,
    },
    command: method,
    Command: method,
    args: params || '',
    Args: params || '',
    argsObj: process['temp_params'] || [],
    ArgsObj: process['temp_params'] || [],
    path: {
      configPath: process.env.templateFile || '',
    },
    Path: {
      ConfigPath: process.env.templateFile || '',
    },
  };
  return inputs;
}

export function getServiceActions(configData: any, version: string, options: any) {
  const { method } = options;
  if (version === '0.0.1') {
    const { Extends = {} } = configData;
    const hooks = Extends[method];
    return hooks;
  }
  const { actions = {} } = configData;
  const hooks: any = [];
  Object.keys(actions).forEach(actionKey => {
    const formatAction = actionKey.split('-');
    const hookList = actions[actionKey];
    if (formatAction.length > 1) {
      const _method = formatAction[1];
      if (_method === method) {
        const _executionOrder = formatAction[0];
        hookList.forEach((hookDetail: any) => {
          const _hookDetail = {
            Hook: hookDetail.run,
            Path: hookDetail.path,
            Pre: _executionOrder === 'pre' ? true : false,
          };
          hooks.push(_hookDetail);
        });
      }
    } else if (actionKey === method) {
      hookList.forEach((hookDetail: any) => {
        const _hookDetail = {
          Hook: hookDetail.run,
          Path: hookDetail.path,
          Pre: false,
        };
        hooks.push(_hookDetail);
      });
    }
  });
  return hooks;
}

export function getServiceList(configData: any) {
  const edition = configData.edition || '0.0.1';
  if (edition === '0.0.1') {
    return configData;
  }
  return configData.services;
}

export default {
  getSubcommand,
  getServiceConfig,
  getServiceConfigDetail,
  getServiceInputs,
  getServiceActions,
  getServiceList,
};
