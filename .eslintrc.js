module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
    },
    "parser": "babel-eslint",
    "extends": ["eslint:recommended", "google"],
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "rules": {
        "semi": "off",
        "arrow-parens": "off",
        "quotes": "off",
        "no-dupe-keys": "off",
        "comma-dangle": "off",
        "linebreak-style": "off",
        "eol-last": "off",
        "require-jsdoc": "off",
        "space-before-blocks": "off",
        "indent": "off",
        "operator-linebreak": "off"
        // [
        //   "error", "after", {
        //     "overrides": {
        //       "?": "before", ":": "before"}
        //     }
        // ]
      },
};
