<!-- Topics -->

## Eslint and prettier setup

➡ install

1. eslint --save-dev
2. @typescript-eslint/parser --save-dev
3. @typescript-eslint/eslint-plugin --save-dev
4. npx eslint --init
   OR
   npm init @eslint/config@latest
5. prettier --save-dev
6. eslint-config-prettier --save-dev

➡ scripts

```js
"lint": "npx eslint src --ignore-pattern .ts",
"lint:fix": "npx eslint src --fix",
"prettier": "prettier --ignore-path .gitignore --write \"./src/\*_/_.+(js|ts|json)\"",
"prettier:fix": "npx prettier --write src",
```
