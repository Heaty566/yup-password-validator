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
