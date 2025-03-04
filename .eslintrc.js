module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'default',
    ecmaVersion: 2017
  },
  env: {
    browser: true,
    node: true
  },
  extends: [
    'eslint:recommended'
  ],
  rules: {
    // Disable some of the more annoying/unneeded default rules from eslint
    'no-console': 0,
    'no-control-regex': 0,
    'no-regex-spaces': 0,
    'no-extra-semi': 0,
    'indent': 0,

    // modules & imports
    'global-require': 0,

    // vue-specfic
    'vue/require-render-return': 0,

    // variables & assignment
    'no-multi-assign': 0,
    'no-param-reassign': 0,
    'no-shadow': 0,
    'one-var': 0,
    'no-unused-vars': [1, {args: 'none', vars: 'local' }],
    'guard-for-in': 0,

    // Naming conventions
    'new-cap': [1, {capIsNew: false}],
    'camelcase': 0,

    // General style, braces, & whitespace
    'max-len': [1, {
      code: 120,
      tabWidth: 4,
      ignoreUrls: true,
      ignorePattern: '^import .*',
    }],
    'no-tabs': 1,
    'no-mixed-spaces-and-tabs': 1,
    'no-multi-spaces': 0,
    'no-trailing-spaces': 1,
    'block-spacing': [1, 'always'],
    'key-spacing': [1, {
      beforeColon: false,
      afterColon: true,
      mode: 'minimum'
    }],
    'curly': 0,
    'brace-style': [1, '1tbs', {allowSingleLine: true}],
    'padded-blocks': 0,
    'comma-dangle': 0,
    'object-curly-spacing': 0,
    'quote-props': 0,
    'arrow-parens': 0,

    // commence
    'require-jsdoc': 0,
    'spaced-comment': [1, 'always', {exceptions: ['/', '*', '+', '@']}],

    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
