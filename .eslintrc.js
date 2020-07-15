module.exports = {
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'max-len': ['error', { code: 120 }],
    // 'no-console': 2,
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',

  },
  env: {
    node: true,
    mocha: true,
    browser: true,
    es6: true,
  },
  plugins: [
    '@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  // "settings": {
  //   "import/resolver": {
  //     "node": {
  //       "extensions": [".js", ".jsx", ".ts", ".tsx"]
  //     }
  //   }
  // },
};


// {
//   "root": true,
//   "parser": "@typescript-eslint/parser",
//   "plugins": [
//     "@typescript-eslint"
//   ],
//   "extends": [
//     "eslint:recommended",
//     "plugin:@typescript-eslint/eslint-recommended",
//     "plugin:@typescript-eslint/recommended"
//   ]
// }