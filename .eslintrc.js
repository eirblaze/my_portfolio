// @ts-check
////<reference path="eslint"/>
const merge = require("webpack-merge").default

const eslintCfg = []

eslintCfg.push({
  // 共通
  extends: ["eslint:recommended"],
  settings: {
    "import/resolver": {
      webpack: {
        config: "webpack.config.ts",
      },
      resolvePaths: [__dirname],
      tryExtensions: [".js", ".json", ".node", ".ts", ".jsx", ".tsx", ".mjs"],
    },
  },
  env: {
    es2020: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    // インデント
    // 'indent': [
    //   'error',
    //   2
    // ],
    // 'linebreak-style': [
    //   'error',
    //   'unix'
    // ],

    // [セミコロン](https://qiita.com/mysticatea/items/9da94240f29ea516ae87)
    // "semi": ["error", "never", {"beforeStatementContinuationChars": "never"}],
    // "semi-spacing": ["error", {"after": true, "before": false}],
    // "semi-style": ["error", "first"],
    // "no-extra-semi": "error",
    // "no-unexpected-multiline": "error",
    // "no-unreachable": "error",

    // コンソールログ
    "no-console": "off",
    "no-restricted-syntax": [
      "error",
      {
        selector:
          "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
        message: "Unexpected property on console object was called",
      },
    ],
  },
})

// src
eslintCfg.push({
  overrides: [
    {
      files: ["**/src/**/*.ts", "**/src/**/*.js"],
      plugins: ["jquery"],
      env: {
        browser: true,
        jquery: true,
      },
    },
  ],
})

// ts
eslintCfg.push({
  overrides: [
    {
      files: ["**/*.ts"],
      env: {
        es2021: true,
      },
      extends: ["plugin:@typescript-eslint/recommended"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        sourceType: "module",
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
      },
      plugins: ["@typescript-eslint"],
      settings: {
        "import/parsers": {
          "@typescript-eslint/parser": [".ts", ".tsx"],
        },
        "import/resolver": {
          typescript: {
            alwaysTryTypes: false, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
          },
        },
      },
    },
  ],
})

// node
// yarn add -D eslint-plugin-node
// https://www.npmjs.com/package/eslint-plugin-node
eslintCfg.push({
  overrides: [
    {
      files: [
        ".eslintrc.*",
        "*.config.*",
        "gulpfile.*",
        "tasks/**/*.ts",
        "tasks/**/*.js",
      ],
      plugins: ["node"], // eslint-plugin-node は plugin の設定をしていないにもかかわらず、extends の設定をしておけば extends の config が plugin を読み込んでくれるので、plugin に何も書かなくても plugin が使えた @see https://blog.ojisan.io/eslint-plugin-and-extend
      extends: ["eslint:recommended", "plugin:node/recommended"],
      parserOptions: {
        // Only ESLint 6.2.0 and later support ES2020.
        ecmaVersion: 2020,
      },
      env: {
        browser: false,
        node: true,
      },
      settings: {
        node: {
          tryExtensions: [
            ".js",
            ".json",
            ".node",
            ".ts",
            ".jsx",
            ".tsx",
            ".mjs",
          ],
        },
      },
      rules: {
        // disallow deprecated APIs
        "node/no-deprecated-api": "error",

        // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-unsupported-features/es-syntax.md
        "node/no-unsupported-features/es-syntax": [
          "error",
          {
            // Node.js のバージョン。
            // version: ">=14.0.0", // このルールは package.json の engines フィールドを読み取ります。ただし、オプションでバージョンを上書きすることができます。
            ignores: ["modules"],
          },
        ],
        "node/no-unsupported-features/es-builtins": [
          "error",
          {
            // version: ">=14.0.0", // このルールは package.json の engines フィールドを読み取ります。
            // ignores: [],
          },
        ],

        // exportsが混ざってないかどうか検出。混ざってるとどっちか消えるため。
        "node/exports-style": ["error", "module.exports"],

        // import の名前解決。別でやるため不要。
        "node/no-missing-import": "off",
        "node/no-missing-require": "off",
      },
    },
  ],
})

// jest
eslintCfg.push({
  overrides: [
    {
      files: [
        "**/__tests__/**/*.ts",
        "**/__tests__/**/*.js",
        "**/*.test.js",
        "**/*.test.ts",
      ],
      plugins: ["jest"],
      env: {
        "jest/globals": true,
      },
      extends: ["plugin:jest/recommended", "plugin:jest/style"],
    },
  ],
})

// prettier
// 最後にプッシュする
eslintCfg.push({
  plugins: ["prettier"],
  extends: [
    "prettier", // "prettier/@typescript-eslint" has been merged into "prettier" in eslint-config-prettier 8.0.0. See: https://github.com/prettier/eslint-config-prettier/blob/main/CHANGELOG.md#version-800-2021-02-21
  ],
  rules: {
    "prettier/prettier": [
      "error",
      {
        semi: false,
      },
    ],
  },
})

module.exports = merge(eslintCfg)
