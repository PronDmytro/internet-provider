module.exports = {
  root: true,
  env: {
    es2021: true,
  },
  extends: ['google'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'max-len': ['error', {code: 140}],
    'new-cap': ['warn', {'capIsNew': false}],
    'require-jsdoc': 'off',
    'valid-jsdoc': 'warn',
    'indent': ['error', 2],
    'no-invalid-this': 'off',
    'padded-blocks': ['error', {'classes': 'always'}],
    '@typescript-eslint/explicit-member-accessibility': ['error'],
  },
};
