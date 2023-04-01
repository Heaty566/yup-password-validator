![npm](https://img.shields.io/npm/v/yup-password-validator)
![npm](https://img.shields.io/npm/dw/yup-password-validator)
![npm bundle size](https://img.shields.io/bundlephobia/min/yup-password-validator)

[![NPM](https://nodei.co/npm/yup-password-validator.png)](https://nodei.co/npm/yup-password-validator/)

# yup-password-validator

A yup extension that help to validate a complex password

## Requirement

Yup version: 1.x.x

## Installation

### Npm

```sh
npm install yup yup-password-validator
```

### Yarn

```sh
yarn add yup yup-password-validator
```

## Yup extend function

- minOfUppercase(min: number, message?: string): Specifies the minimum number of uppercase string characters.
- minOfLowercase(min: number, message?: string): Specifies the minimum number of lowercase string characters.
- minOfNumeric(min: number, message?: string): Specifies the minimum number of numeric string characters.
- minOfSpecialCharacters(min: number, message?: string): Specifies the minimum number of special characters.
- noWhiteSpaces(message?: string): Specifies that the string should not contain white spaces.
- onlyLatinCharacters(message?: string): Specifies that the string should contain only latin characters.

## Usage

```js
// example/usage.js

const yup = require('yup');
const { yupPassword } = require('yup-password-validator');

const schema = (input) =>
      yup
            .object()
            .shape({
                  username: yup.string().min(5).max(200).required(),
                  password: yupPassword
                        .minOfSpecialCharacters(2)
                        .minOfLowercase(2)
                        .minOfUppercase(2)
                        .minOfNumeric(2)
                        .noWhiteSpaces()
                        .onlyLatinCharacters()
                        .required(),
            })
            .validate(input);

const { error } = schema({ username: 'hello', password: 'AAaa@@00' });
console.log(error); // undefined
```

## Custom error message

```js
// example/custom.js

const yup = require('yup');
const { yupPassword } = require('yup-password-validator');

const schema = (input) =>
      yup
            .object()
            .shape({
                  username: yup.string().required(),
                  password: yupPassword
                        .minOfSpecialCharacters(4, 'custom message 1')
                        .minOfLowercase(4, 'custom message 2')
                        .minOfUppercase(5, 'custom message 3')
                        .minOfNumeric(6, 'custom message 4')
                        .noWhiteSpaces('custom message 5')
                        .onlyLatinCharacters('custom message 6')
                        .required(),
            })
            .validate(input, { abortEarly: false });

const { error } = schema({ username: 'aA', password: 'aA@0は ' });

console.log(error);
// custom message 1
// custom message 2
// custom message 3
// custom message 4
// custom message 5
// custom message 6
```

## Other Password Validator

- [joi-password](https://www.npmjs.com/package/joi-password): A joi extension that help to validate a complex password
- [superstruct-password](https://www.npmjs.com/package/superstruct-password): A superstruct extension that help to validate a complex password

## License

MIT
