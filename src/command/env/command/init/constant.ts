import { isEmpty, trim } from 'lodash';

const validateInput = (input: string) => (isEmpty(trim(input)) ? 'Cannot be empty' : true);

export const ENVIRONMENT_FILE_NAME = 'env.yaml';

export const INQUIRE_OPTIONS = [
  {
    type: 'input',
    message: 'name:',
    name: 'name',
    validate: validateInput,
  },
  {
    type: 'input',
    message: 'project:',
    name: 'project',
    validate: validateInput,
  },
  {
    type: 'input',
    message: 'description:',
    name: 'description',
  },
  {
    type: 'input',
    message: 'type:',
    name: 'type',
    validate: validateInput,
  },
  {
    type: 'input',
    message: 'region:',
    name: 'region',
    validate: validateInput,
  },
  {
    type: 'input',
    message: 'role:',
    name: 'role',
    validate: validateInput,
  },
  {
    type: 'input',
    message: 'access:',
    name: 'access',
    default: 'default',
    validate: validateInput,
  },
  {
    type: 'input',
    message: 'template:',
    name: 'template',
    default: ENVIRONMENT_FILE_NAME,
  },
];
