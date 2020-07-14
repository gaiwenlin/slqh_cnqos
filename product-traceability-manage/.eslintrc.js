// https://eslint.org/docs/user-guide/configuring
module.exports = {
  "env": {
    "node": true
  },
  "extends": [
    "plugin:vue/essential",
    "eslint:recommended"
  ],
  "parserOptions": {
    "parser": "babel-eslint"
  },
  // required to lint *.vue files
  plugins: [
    "vue"
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    "generator-star-spacing": "off",
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "semi": ["error", "always"], // 语句强制分号结尾
    "no-extra-semi": 1,//多余的分号
    "brace-style": ["error", "stroustrup"],
    "no-new": 0,//禁止在使用new构造一个实例后不赋值
    "indent": [0, 4],//缩进风格
    "no-unused-vars": [2, {
      // 允许声明未使用变量
      "vars": "local",
      // 参数不检查
      "args": "none"
    }],
    "comma-spacing": ["error", { "before": false, "after": true }],
    "object-curly-spacing": ["error", "always"],
    "key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
    // 规定多行 if 语句的的括号不能省略
    "curly": ["error", "multi-line"],
    "quotes": ["error", "single"],
    // 语句强制分号结尾
    "no-console": ["off"],
    "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }],
    "no-useless-escape": ["off"],
    "no-cond-assign": ["off"],
  },
  globals: {
    "abp": true,
  }
};
