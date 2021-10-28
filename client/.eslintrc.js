module.exports = {
  overrides: [
    {
      files: ['.ts'],
      parserOptions: {
        project: ['tsconfig.?.json', 'e2e/tsconfig.json'],
        createDefaultProgram: true,
      },
      extends: ['plugin:@angular-eslint/recommended', '../.eslintrc.js'],
      rules: {},
    },
    {
      files: ['.component.html'],
      // extends: ['plugin:@/template/recommended'],
      plugins: ['html'],
      rules: {
        'max-len': ['error', {code: 120}],
      },
    },
    {
      files: ['.component.ts'],
      extends: ['plugin:@angular-eslint/template/process-inline-templates'],
    },
    {
      files: ['src//*.spec.ts', 'src//*.d.ts'],
      parserOptions: {
        project: './src/tsconfig.spec.json',
      },
      extends: ['plugin:jasmine/recommended'],
      plugins: ['jasmine'],
      env: {jasmine: true},
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
};
