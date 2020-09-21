module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parser: "babel-eslint",
  extends: ["standard", "standard-react", "prettier"],
  plugins: ["react", "react-hooks"],
  rules: {
    strict: 0,
    "jsx-quotes": ["error", "prefer-double"],
    "no-console": "warn",
    "no-multiple-empty-lines": "warn",
    "prefer-template": "warn",
    "prefer-const": "warn",
    "react/prop-types": 0,
    "no-async-promise-executor": 0,
    "react-hooks/rules-of-hooks": "warn",
    "react-hooks/exhaustive-deps": "warn",
    "react/jsx-indent-props": 0,
    "react/jsx-first-prop-new-line": 0,
    "react/jsx-closing-bracket-location": 0,
    "react/jsx-tag-spacing": 0,
    "react/jsx-indent": 0,
    "react/jsx-closing-tag-location": 0,
    "comma-dangle": 0,
    "no-unused-vars": "warn",
    camelcase: "warn",
  },
};