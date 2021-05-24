module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: [
    'semistandard', 'standard-jsx'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  ignorePatterns: ['public/**/*', 'modules/**/*'],
  rules: {
    'react/jsx-handler-names': ['off'],
    'no-unused-vars': ['error', {
      vars: 'all',
      args: 'after-used',
      ignoreRestSiblings: false,
      varsIgnorePattern: '^m$'
    }]
  }
};
