import { isEmpty, trim } from 'lodash';

const validateInput = (input: string) => (isEmpty(trim(input)) ? 'Cannot be empty' : true);

export const INQUIRE_OPTIONS = [
  {
    type: 'input',
    message: 'name: ',
    name: 'name',
    validate: validateInput,
  },
  {
    type: 'input',
    message: 'describation: ',
    name: 'describation',
    validate: validateInput,
  },
  {
    type: 'input',
    message: 'type: ',
    name: 'type',
    validate: validateInput,
  },
  {
    type: 'input',
    message: 'region: ',
    name: 'region',
    validate: validateInput,
  },
  {
    type: 'input',
    message: 'role: ',
    name: 'role',
    validate: validateInput,
  },
  {
    type: 'input',
    message: 'props: ',
    name: 'props',
    validate: (input: string) => {
      if (isEmpty(trim(input))) {
        return 'Cannot be empty';
      }
      try {
        JSON.parse(input);
        return true;
      } catch (e) {
        return 'Must be a valid JSON string';
      }
    },
  },
];

export const ENVIRONMENT_FILE_NAME = '.environment.yaml';
