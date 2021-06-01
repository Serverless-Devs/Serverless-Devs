/** @format */

export type ProviderName = 'alibaba' | 'baidu' | 'huawei' | 'aws' | 'azure' | 'google' | 'tencent';

export enum ProviderObject {
  alibaba = 'Alibaba Cloud (alibaba)',
  baidu = 'Baidu Cloud (baidu)',
  huawei = 'Huawei Cloud (huawei)',
  aws = 'AWS (aws)',
  azure = 'Azure (azure)',
  google = 'Google Cloud (google)',
  tencent = 'Tencent Cloud (tencent)',
}

export const providerArray: ProviderName[] = ['alibaba', 'baidu', 'huawei', 'aws', 'azure', 'google', 'tencent'];

export type ProviderCollectionConfig = {
  [k in ProviderName]: {
    type: string;
    message: string;
    name: string;
    default: string;
  }[];
};

export const providerCollection: ProviderCollectionConfig = {
  alibaba: [
    {
      type: 'input',
      message: 'AccountID',
      name: 'AccountID',
      default: '',
    },
    {
      type: 'input',
      message: 'AccessKeyID',
      name: 'AccessKeyID',
      default: '',
    },
    {
      type: 'input',
      message: 'AccessKeySecret',
      name: 'AccessKeySecret',
      default: '',
    },
  ],

  aws: [
    {
      type: 'input',
      message: 'AccessKeyID',
      name: 'AccessKeyID',
      default: '',
    },

    {
      type: 'input',
      message: 'SecretAccessKey',
      name: 'SecretAccessKey',
      default: '',
    },
  ],

  huawei: [
    {
      type: 'input',
      message: 'AccessKeyID',
      name: 'AccessKeyID',
      default: '',
    },

    {
      type: 'input',
      message: 'SecretAccessKey',
      name: 'SecretAccessKey',
      default: '',
    },
  ],

  azure: [
    {
      type: 'input',
      message: 'KeyVaultName',
      name: 'KeyVaultName',
      default: '',
    },

    {
      type: 'input',
      message: 'TenantID',
      name: 'TenantID',
      default: '',
    },
    {
      type: 'input',
      message: 'ClentID',
      name: 'ClentID',
      default: '',
    },

    {
      type: 'input',
      message: 'ClientSecret',
      name: 'ClientSecret',
      default: '',
    },
  ],

  baidu: [
    {
      type: 'input',
      message: 'AccessKeyID',
      name: 'AccessKeyID',
      default: '',
    },

    {
      type: 'input',
      message: 'SecretAccessKey',
      name: 'SecretAccessKey',
      default: '',
    },
  ],
  google: [
    {
      type: 'input',
      message: 'PrivateKeyData',
      name: 'PrivateKeyData',
      default: '',
    },
  ],

  tencent: [
    {
      type: 'input',
      message: 'AccountID',
      name: 'AccountID',
      default: '',
    },
    {
      type: 'input',
      message: 'SecretID',
      name: 'SecretID',
      default: '',
    },
    {
      type: 'input',
      message: 'SecretKey',
      name: 'SecretKey',
      default: '',
    },
  ],
};

export interface AccessFormat {
  AccountID?: string;
  AccessKeyID?: string;
  AccessKeySecret?: string;
  SecretAccessKey?: string;
  KeyVaultName?: string;
  TenantID?: string;
  ClientID?: string;
  ClientSecret?: string;
  SecretID?: string;
  PrivateKeyData?: string;
}

export const providerAccessFormat: {
  [k in ProviderName]: (keyof AccessFormat)[];
} = {
  alibaba: ['AccountID', 'AccessKeyID', 'AccessKeySecret'],
  aws: ['AccessKeyID', 'SecretAccessKey'],
  baidu: ['AccessKeyID', 'SecretAccessKey'],
  huawei: ['AccessKeyID', 'SecretAccessKey'],
  azure: ['KeyVaultName', 'TenantID', 'ClientID', 'ClientSecret'],
  tencent: ['AccountID', 'SecretID'],
  google: ['PrivateKeyData'],
};

export const checkProviderList: {
  type: string;
  name: string;
  message: string;
  choices: {
    name: ProviderObject;
    value: ProviderName;
  }[];
}[] = [
  {
    type: 'list',
    name: 'provider',
    message: 'Please select a provider:',
    choices: [
      { name: ProviderObject.alibaba, value: 'alibaba' },
      { name: ProviderObject.aws, value: 'aws' },
      { name: ProviderObject.azure, value: 'azure' },
      { name: ProviderObject.baidu, value: 'baidu' },
      { name: ProviderObject.google, value: 'google' },
      { name: ProviderObject.huawei, value: 'huawei' },
      { name: ProviderObject.tencent, value: 'tencent' },
    ],
  },
];

export function getInputData(program: AccessFormat): AccessFormat {
  const inputSecretCheck: AccessFormat = {};
  if (program.AccountID) {
    inputSecretCheck.AccountID = program.AccountID;
  }
  if (program.AccessKeyID) {
    inputSecretCheck.AccessKeyID = program.AccessKeyID;
  }
  if (program.AccessKeySecret) {
    inputSecretCheck.AccessKeySecret = program.AccessKeySecret;
  }
  if (program.SecretID) {
    inputSecretCheck.SecretID = program.SecretID;
  }
  if (program.SecretAccessKey) {
    inputSecretCheck.SecretAccessKey = program.SecretAccessKey;
  }
  if (program.KeyVaultName) {
    inputSecretCheck.KeyVaultName = program.KeyVaultName;
  }
  if (program.TenantID) {
    inputSecretCheck.TenantID = program.TenantID;
  }
  if (program.ClientID) {
    inputSecretCheck.ClientID = program.ClientID;
  }
  if (program.ClientSecret) {
    inputSecretCheck.ClientSecret = program.ClientSecret;
  }
  if (program.PrivateKeyData) {
    inputSecretCheck.PrivateKeyData = program.PrivateKeyData;
  }

  return inputSecretCheck;
}
