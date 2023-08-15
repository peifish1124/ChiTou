module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb", "next", "prettier", "plugin:prettier/recommended"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "import/extensions": "off",
    "import/no-unresolved": "off",
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.js", ".eslintrc.cjs"],
      parserOptions: {
        sourceType: "script",
      },
      extends: ["plugin:prettier/recommended"],
    },
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
};
