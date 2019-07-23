module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    parser: "typescript-eslint-parser",
    sourceType: "module",
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/recommended",
    "plugin:prettier/recommended"
  ],
  plugins: ["vue", "prettier"],
  rules: {
    semi: [2, "never"],
    "no-console": "off",
    "vue/max-attributes-per-line": "off",
    "vue/html-self-closing": "off",
    "prettier/prettier": ["error", {
      semi: false
    }]
  }
};
