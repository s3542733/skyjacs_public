module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/prop-types": ["error", { "ignore": ["navigation"] }],
    "react/prefer-stateless-function": "off",
  }
};
