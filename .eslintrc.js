module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': ['eslint:recommended', 'plugin:prettier/recommended', 'plugin:react/recommended', 'google', 'plugin:storybook/recommended'],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'plugins': ['react', '@typescript-eslint'],
  'rules': {
    "react/react-in-jsx-scope": "off"
  }
};