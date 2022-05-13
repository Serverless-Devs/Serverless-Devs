import program from '@serverless-devs/commander';
import core from '../utils/core';
import i18n from '../utils/i18n';
import { emoji, getProcessArgv, logger, red } from '../utils';
import path from 'path';
import Ajv from 'ajv';
import { HandleError } from '../error';

const { colors, getYamlContent, lodash, loadComponent, fse: fs, parseYaml, spinner } = core;
const { get, keys, omit, isEmpty, replace, isPlainObject, isArray, each, last, split, uniq, map, concat, filter } =
  lodash;

const description = `Application verification.
    
    Example:
        $ s verify

${emoji('📖')} Document: ${colors.underline(
  'https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/verify.md',
)}`;
const command = program
  .name('s verify')
  .usage('[options]')
  .option('-t, --template [templatePath]', 'Specify the template file')
  .helpOption('-h, --help', i18n('display_help_for_command'))
  .description(description)
  .addHelpCommand(false)
  .parse(process.argv);

function deleteXkey(obj: any) {
  let result: any = isArray(obj) ? [] : {};
  if (typeof obj === 'object') {
    const keyList = keys(obj).filter((v: string) => v.startsWith('x-'));
    const xobj = omit(obj, keyList);
    for (const i in xobj) {
      result[i] = typeof obj[i] === 'object' ? deleteXkey(obj[i]) : obj[i];
    }
  } else {
    result = obj;
  }
  return result;
}

function transforData(obj: any) {
  const data = deleteXkey(obj);
  const tempArr = [];
  function getRequiredKey(value: any, parentStr = '') {
    if (isPlainObject(value)) {
      if (value.required === true) {
        const newArr = split(parentStr, '.');
        const newStr = newArr.slice(0, newArr.length - 2).join('.');
        tempArr.push({
          key: newStr,
          name: last(newArr),
        });
      }
      if (typeof value.required === 'boolean') {
        delete value.required;
      }
      if (parentStr !== '') {
        parentStr = `${parentStr}.`;
      }
      for (const key in value) {
        getRequiredKey(value[key], `${parentStr}${key}`);
      }
    }
    if (isArray(value)) {
      each(value, (item, index) => {
        getRequiredKey(item, `${parentStr}[${index}]`);
      });
    }
  }
  function setRequiredKey(value: any, parentStr = '') {
    if (isPlainObject(value)) {
      const filterArr = filter(tempArr, o => o.key === parentStr);
      if (filterArr.length > 0) {
        const names = map(filterArr, o => o.name);
        value.required = value.required ? uniq(concat(value.required, names)) : names;
      }

      if (parentStr !== '') {
        parentStr = `${parentStr}.`;
      }
      for (const key in value) {
        setRequiredKey(value[key], `${parentStr}${key}`);
      }
    }
    if (isArray(value)) {
      each(value, (item, index) => {
        setRequiredKey(item, `${parentStr}[${index}]`);
      });
    }
  }
  getRequiredKey(data);
  setRequiredKey(data);
  return data;
}

(async () => {
  const { help, template } = getProcessArgv();
  if (help) {
    command.help();
  }
  const originSpath = await core.getTemplatePath(template);
  const templatePath = await core.transforYamlPath(originSpath);
  const data = fs.readFileSync(templatePath, 'utf8');
  const doc = parseYaml(data);
  const { services } = doc;
  const componentList = [];
  for (const key in services) {
    const ele = services[key];
    componentList.push({
      component: ele.component,
      props: ele.props,
      service: key,
    });
  }
  const validList = [];
  for (const item of componentList) {
    const componentInstance = await loadComponent(item.component);
    const publishData = await getYamlContent(path.join(componentInstance.__path, 'publish.yaml'));
    const schemaData = get(publishData, 'Properties', {});
    if (isEmpty(schemaData.properties)) {
      continue;
    }
    const ajv = new Ajv({
      strict: false,
    });
    const validate = ajv.compile(transforData(schemaData));
    const valid = validate(item.props);
    if (!valid) {
      validList.push(true);
      const { errors } = validate;
      const ferrors = filter(errors, o => o.keyword !== 'oneOf');
      logger.log(`${red('✖')} Format verification failed.`);
      const instancePath = get(ferrors, '[0].instancePath');
      if (instancePath) {
        const errKey = replace(instancePath.slice(1), /\//g, '.');
        logger.log(`The ${colors.yellow(errKey)} field in ${colors.yellow(item.service)} service is incorrect.\n`);
      }
      const rows = map(ferrors, o => ({
        message: o.message,
        params: o.params,
      }));
      logger.output(rows.length > 1 ? rows : rows[0]);
      break;
    }
  }
  validList.length === 0 && spinner('Format verification passed.').succeed();
})().catch(async error => {
  await HandleError(error);
});
