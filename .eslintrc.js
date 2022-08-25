module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  extends: ["plugin:prettier/recommended"],
  plugins: ["@typescript-eslint", "prettier", "eslint-plugin-prettier"],
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
      },
    },
  },
};
