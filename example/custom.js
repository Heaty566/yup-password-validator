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
