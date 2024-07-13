import globals from 'globals'
import pluginJs from '@eslint/js'

export default [
  {
    languageOptions: {
      globals: { ...globals.node, ...globals.browser, ...globals.mocha }
    },
    ignores: ['./lib', './webpack.config.js']
  },
  pluginJs.configs.recommended,
  {
    rules: {
      'no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' }
      ]
    }
  }
]
