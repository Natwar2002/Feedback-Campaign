import type { UserConfig } from '@commitlint/types';

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],

  rules: {
    // type must be one of these
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore'],
    ],

    // type must not be empty
    'type-empty': [2, 'never'],

    // subject must not be empty
    'subject-empty': [2, 'never'],

    // max header length
    'header-max-length': [2, 'always', 100],

    // enforce lowercase type
    'type-case': [2, 'always', 'lower-case'],

    // optional: scope rules
    'scope-enum': [
      1,
      'always',
      ['auth', 'user', 'campaign', 'workspace', 'common'],
    ],
  },
};

export default Configuration;