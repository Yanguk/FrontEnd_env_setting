module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    // 'eslint:recommended',
    // 'plugin:@typescript-eslint/recommended',
    // 'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: 'tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    // 'react',
    '@typescript-eslint',
    // 'prettier'
  ],
  rules: {
    '@typescript-eslint/no-var-requires': 0,
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error"
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
