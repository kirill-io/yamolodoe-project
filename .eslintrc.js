module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      babelrc: false,
      configFile: false,
      presets: ['@babel/preset-env'],
    },
  },
  extends: [
    'plugin:import/recommended',
    'airbnb-base',
  ],
  rules: {
    'import/no-unresolved': 0,
    'no-undef': 0,
    'no-underscore-dangle': 0,
    'class-methods-use-this': 0,
    'no-use-before-define': 0,
    'import/prefer-default-export': 0,
    'no-new': 0,
    'no-restricted-syntax': 0,
    'no-param-reassign': 0,
  },
};
