import { i18n } from '../../utils';


export const providerArray: string[] = ['alibaba', 'baidu', 'huawei', 'aws', 'azure', 'google', 'tencent'];

export const providerObject: any = {
  alibaba: i18n.__('Alibaba Cloud'),
  baidu: i18n.__('Baidu Cloud'),
  huawei: i18n.__('Huawei Cloud'),
  aws: i18n.__('AWS Cloud'),
  azure: i18n.__('Azure Cloud'),
  google: i18n.__('Google Cloud'),
  tencent: i18n.__('Tencent Cloud'),
};

export const providerCollection: any = {
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

export const providerAccessFormat: any = {
  alibaba: ['AccountID', 'AccessKeyID', 'AccessKeySecret'],
  aws: ['AccessKeyID', 'SecretAccessKey'],
  baidu: ['AccessKeyID', 'SecretAccessKey'],
  huawei: ['AccessKeyID', 'SecretAccessKey'],
  azure: ['KeyVaultName', 'TenantID', 'ClientID', 'ClientSecret'],
  tencent: ['AccountID', 'SecretID', 'SecretKey'],
  google: ['PrivateKeyData'],
};

export const checkProviderList: any[] = [
  {
    type: 'list',
    name: 'provider',
    message: i18n.__('Please select a provider:'),
    choices: [
      { name: i18n.__('Alibaba Cloud (alibaba)'), value: 'alibaba' },
      { name: i18n.__('AWS (aws)'), value: 'aws' },
      { name: i18n.__('Azure (azure)'), value: 'azure' },
      { name: i18n.__('Baidu Cloud (baidu)'), value: 'baidu' },
      { name: i18n.__('Google Cloud (google)'), value: 'google' },
      { name: i18n.__('Huawei Cloud (huawei)'), value: 'huawei' },
      { name: i18n.__('Tencent Cloud (tencent)'), value: 'tencent' },
    ],
  },
];

export function getInputData(program: any) {
  const inputSecretCheck: any = {};
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
  if (program.SecretKey) {
    inputSecretCheck.SecretKey = program.SecretKey;
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
