import { spawnSync } from 'child_process';
import path from 'path';
import * as fs from 'fs-extra';
const s = path.resolve(__dirname, process.platform === 'win32' ? '../bin/s.cmd' : '../bin/s');
const cwd = path.resolve(__dirname, '_temp');

beforeAll(() => {
  fs.removeSync(cwd);
});

test('start-unzip-oss-v3@0.0.5', async () => {
  const template = 'start-unzip-oss-v3@0.0.5';
  const dest = path.join(cwd, template);
  const res = spawnSync(s, [
    'init',
    template,
    '-d',
    dest,
    '-a',
    'default',
    '--app-name',
    'appName',
    '--parameters',
    '{"bucketName":"xiliu-hz-test","functionName":"oss-invoke-fc-c5y9","prefix":"src","processedDir":"dst","region":"cn-hangzhou","retainFileName":"false","roleArn":"acs:ram::1702981446385561:role/aliyunfcdefaultrole","triggerRoleArn":"acs:ram::1702981446385561:role/aliyunosseventnotificationrole"}',
  ]);
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(fs.existsSync(dest)).toBeTruthy();
});

test('TripBookingOrderProcessing@0.0.8', async () => {
  const template = 'TripBookingOrderProcessing@0.0.8';
  const dest = path.join(cwd, template);
  const res = spawnSync(s, [
    'init',
    template,
    '-d',
    dest,
    '-a',
    'default',
    '--app-name',
    'appName',
    '--parameters',
    '{"flowName":"trip-booking-order-processing-flow-9pg3","fnfRoleArn":"acs:ram::1431999136518149:role/fnf-execution-default-role","functionName":"TripBookingOrderProcessing-9pg3-qdpjelpy","region":"cn-hangzhou","serviceName":"trip-booking-flow-9pg3","serviceRoleArn":"acs:ram::1431999136518149:role/aliyunfcdefaultrole"}',
  ]);
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(fs.existsSync(dest)).toBeTruthy();
});

test('start-cadt-app@0.0.4', async () => {
  const template = 'start-cadt-app@0.0.4';
  const dest = path.join(cwd, template);
  const res = spawnSync(s, [
    'init',
    template,
    '-d',
    dest,
    '-a',
    'default',
    '--app-name',
    'appName',
    '--parameters',
    '{"cadtJsonString":{"bucket_1691151092":{"component":"aliyun_oss_bucket@dev","props":{"bucket":"xl-bucket-3002","redundancy_type":"LRS"}},"logStore_sourcelog_1693965436":{"component":"aliyun_sls_logstore@dev","props":{"depends_on":["logProject_1693965436"]}},"fc_function_1693882938":{"component":"fc3","actions":{"pre-deploy":[{"path":"./","run":"bash init_code.sh nodejs16 xl-fc-3002 index.js"}]},"props":{"function":{"handler":"index.handler","diskSize":512,"memorySize":512,"code":"xl-fc-3002","functionName":"xl-fc-3002","environmentVariables":{"TZ":"Asia/Shanghai","stackName":"${resources.cadt_9U8TNE2C4Z5EO3UF.props.name}"},"runtime":"nodejs16","cpu":0.35,"timeout":60},"region":"cn-huhehaote"}},"logProject_1693965436":{"component":"aliyun_sls_project@dev","props":{"name":"xl-sls-3002","description":"xl 3002 test log project"}},"logStore_joblog_1693965436":{"component":"aliyun_sls_logstore@dev","props":{"depends_on":["logProject_1693965436"],"retention_forever":false}},"cadt_9U8TNE2C4Z5EO3UF":{"component":"ros_transformer@dev","props":{"refs":["${resources.bucket_1691151092.output}","${resources.logProject_1693965436.output}","${resources.logStore_sourcelog_1693965436.output}","${resources.logStore_joblog_1693965436.output}"],"name":"cadt_9U8TNE2C4Z5EO3UF","region":"cn-huhehaote"}}}}',
  ]);
  const stdout = res.stdout.toString();
  console.log(stdout);
  expect(fs.existsSync(dest)).toBeTruthy();
});
