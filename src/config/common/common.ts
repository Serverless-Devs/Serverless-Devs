import i18n from '../../utils/i18n';

export const providerArray: Array<string> = ['alibaba', 'baidu', 'huawei', 'aws', 'azure', 'google', 'tencent'];

export const providerObject: any = {
  alibaba: i18n.__('Alibaba Cloud'),
  baidu: i18n.__('Baidu Cloud'),
  huawei: i18n.__('Huawei Cloud'),
  aws: i18n.__('AWS Cloud'),
  azure: i18n.__('Azure Cloud'),
  google: i18n.__('Google Cloud'),
  tencent: i18n.__('Tencent Cloud')
};

export const providerCollection: any = {
  alibaba: [
    {
      type: 'input',
      message: 'AccountID',
      name: 'AccountID',
      default: '' // 默认值
    },
    {
      type: 'input',
      message: 'AccessKeyID',
      name: 'AccessKeyID',
      default: '' // 默认值
    },
    {
      type: 'input',
      message: 'AccessKeySecret',
      name: 'AccessKeySecret',
      default: '' // 默认值
    }
  ],

  aws: [
    {
      type: 'input',
      message: 'AccessKeyID',
      name: 'AccessKeyID',
      default: '' // 默认值
    },

    {
      type: 'input',
      message: 'SecretAccessKey',
      name: 'SecretAccessKey',
      default: '' // 默认值
    }
  ],

  huawei: [
    {
      type: 'input',
      message: 'AccessKeyID',
      name: 'AccessKeyID',
      default: '' // 默认值
    },

    {
      type: 'input',
      message: 'SecretAccessKey',
      name: 'SecretAccessKey',
      default: '' // 默认值
    }
  ],

  azure: [
    {
      type: 'input',
      message: 'KeyVault',
      name: 'KeyVault',
      default: '' // 默认值
    },

    {
      type: 'input',
      message: 'Secret',
      name: 'Secret',
      default: '' // 默认值
    }
  ],

  baidu: [
    {
      type: 'input',
      message: 'AccessKeyID',
      name: 'AccessKeyID',
      default: '' // 默认值
    },

    {
      type: 'input',
      message: 'SecretAccessKey',
      name: 'SecretAccessKey',
      default: '' // 默认值
    }
  ],
  google: [
    {
      type: 'input',
      message: 'AccountID',
      name: 'AccountID',
      default: '' // 默认值
    },

    {
      type: 'input',
      message: 'PrivateKeyData',
      name: 'PrivateKeyData',
      default: '' // 默认值
    }
  ],

  tencent: [
    {
      type: 'input',
      message: 'AccountID',
      name: 'AccountID',
      default: '' // 默认值
    },
    {
      type: 'input',
      message: 'SecretID',
      name: 'SecretID',
      default: '' // 默认值
    },
    {
      type: 'input',
      message: 'SecretKey',
      name: 'SecretKey',
      default: '' // 默认值
    }
  ]
};

export const providerAccessFormat: any = {
  alibaba: ['AccountID', 'AccessKeyID', 'AccessKeySecret'],
  aws: ['AccessKeyID', 'SecretAccessKey'],
  baidu: ['AccessKeyID', 'SecretAccessKey'],
  huawei: ['AccessKeyID', 'SecretAccessKey'],
  azure: ['KeyVault', 'Secret'],
  tencent: ['AccountID', 'SecretID', 'SecretKey'],
  google: ['AccountID', 'PrivateKeyData']
};

export const checkProviderList: Array<any> = [
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
      { name: i18n.__('Tencent Cloud (tencent)'), value: 'tencent' }
    ]
  }
];

export function getInputData(program: any) {
  const inputSecretCheck: any = {};
  if (program.AccountID) {
    inputSecretCheck['AccountID'] = program.AccountID;
  }
  if (program.AccessKeyID) {
    inputSecretCheck['AccessKeyID'] = program.AccessKeyID;
  }
  if (program.AccessKeySecret) {
    inputSecretCheck['AccessKeySecret'] = program.AccessKeySecret;
  }
  if (program.SecretID) {
    inputSecretCheck['SecretID'] = program.SecretID;
  }
  if (program.SecretKey) {
    inputSecretCheck['SecretKey'] = program.SecretKey;
  }
  if (program.SecretAccessKey) {
    inputSecretCheck['SecretAccessKey'] = program.SecretAccessKey;
  }
  return inputSecretCheck;
}