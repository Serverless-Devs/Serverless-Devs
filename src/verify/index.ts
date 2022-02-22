import program from '@serverless-devs/commander';
import core from '../utils/core';
import i18n from '../utils/i18n';
import { emoji, getProcessArgv, logger, red } from '../utils';
import path from 'path';
import Ajv from 'ajv';

const { colors, getTemplatePath, getYamlContent, lodash, loadComponent, fse: fs, parseYaml, spinner } = core;
const { get, isPlainObject, keys, omit, isEmpty, replace } = lodash;

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
  if (isEmpty(obj)) return obj;
  if (typeof obj !== 'object') return obj;
  let newObj = new obj.constructor();
  const keyList = keys(obj).filter((v: string) => v.startsWith('x-'));
  const xobj = omit(obj, keyList);
  for (let key in xobj) {
    let val = obj[key];
    if (isPlainObject(val)) {
      const keyList = keys(val).filter((v: string) => v.startsWith('x-'));
      val = omit(val, keyList);
    }
    newObj[key] = deleteXkey(val);
  }
  return newObj;
}

(async () => {
  const { help, template } = getProcessArgv();
  if (help) {
    command.help();
  }
  const templatePath = await getTemplatePath(template);
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
  const errorList = [];
  for (const item of componentList) {
    const componentInstance = await loadComponent(item.component);
    const publishData = await getYamlContent(path.join(componentInstance.__path, 'publish.yaml'));
    const schemaData = get(publishData, 'Properties.schema');
    if (isEmpty(schemaData)) {
      logger.log(`The ${item.component} component does not support the verification.`);
      continue;
    }
    const ajv = new Ajv({
      strictTuples: false,
    });
    const validate = ajv.compile(deleteXkey(schemaData));
    const valid = validate(item.props);
    if (!valid) {
      const [error] = validate.errors;
      errorList.push(error);
      logger.log(`${red('✖')} Format verification failed.`);
      if (error.instancePath) {
        const errKey = replace(error.instancePath.slice(1), '/', '.');
        logger.log(`The ${colors.yellow(errKey)} field under ${colors.yellow(item.service)} service is incorrect.\n`);
      }
      logger.output({
        message: error.message,
        params: error.params,
      });
      break;
    }
  }
  errorList.length === 0 && spinner('Format verification passed.').succeed();
})();
