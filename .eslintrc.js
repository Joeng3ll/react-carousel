module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 7,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: 'module',
  },
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  globals: {
    DOMParser: true,
    document: true,
    location: true,
    geetest: true,
    window: true,
    deeplink: true,
    jQuery: true,
    _hmt: true,
    $: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  plugins: ['react'],
  parser: 'babel-eslint',
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: '../modular/config/env/dev.babel.js',
      },
    },
  },
  // add your custom rules here
  rules: {
    strict: 0,
    'jsx-a11y/img-has-alt': 0,
    'jsx-a11y/label-has-for': 0,
    semi: 0,
    'no-console': 0,
    'comma-dangle': 0,
    'jsx-quotes': 0,

    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'react/prop-types': 0,
    'react/no-string-refs': 2,
    'react/self-closing-comp': 0,
    'react/no-array-index-key': 0,
    'react/display-name': 0,
    'react/no-deprecated': 0,
  },
}
