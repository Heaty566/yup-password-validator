import * as yup from 'yup';

export interface YupPasswordExtend extends yup.StringSchema {
      /**
       * @description  Specifies the minimum number of uppercase string characters.
       * @param min - the minimum number of uppercase string characters required.
       */
      minOfUppercase(min: number, message?: string): this;

      /**
       * @description  Specifies the minimum number of lowercase string characters.
       * @param min - the minimum number of lowercase string characters required.
       */
      minOfLowercase(min: number, message?: string): this;

      /**
       * @description  Specifies the minimum number of special string characters.
       * @param min - the minimum number of special string characters required.
       */
      minOfSpecialCharacters(min: number, message?: string): this;

      /**
       * @description  Specifies the minimum number of numeric string characters.
       * @param min - the minimum number of numeric string characters required.
       */
      minOfNumeric(min: number, message?: string): this;

      /**
       * @description  Specifies that the string should not contain white spaces.
       * @param message - the error message.
       */
      noWhiteSpaces(message?: string): this;

      /**
       * @description  Specifies that the string should only contain latin characters.
       * @param message - the error message.
       */
      onlyLatinCharacters(message?: string): this;
}

yup.addMethod(yup.string, 'minOfUppercase', function (min: number, message: string) {
      return this.test({
            name: 'minOfUppercase',
            message: message || `should contain at least ${min} uppercase character`,
            test: (value) => {
                  if (!value) return true;

                  return new RegExp(`(?=(.*[A-Z]){${min}})`).test(value);
            },
      });
});

yup.addMethod(yup.string, 'minOfLowercase', function (min: number, message: string) {
      return this.test({
            name: 'minOfLowercase',
            message: message || `should contain at least ${min} lowercase character`,
            test: (value) => {
                  if (!value) return true;

                  return new RegExp(`(?=(.*[a-z]){${min}})`).test(value);
            },
      });
});

yup.addMethod(yup.string, 'minOfSpecialCharacters', function (min: number, message: string) {
      return this.test({
            name: 'minOfSpecialCharacters',
            message: message || `should contain at least ${min} special character`,
            test: (value) => {
                  if (!value) return true;

                  const numSpecial = value.length - (value.match(/[a-zA-Z0-9]/g) || []).length;
                  return numSpecial >= min;
            },
      });
});

yup.addMethod(yup.string, 'minOfNumeric', function (min: number, message: string) {
      return this.test({
            name: 'minOfNumeric',
            message: message || `should contain at least ${min} numeric character`,
            test: (value) => {
                  if (!value) return true;

                  return new RegExp(`(?=(.*[0-9]){${min}})`, 'g').test(value);
            },
      });
});

yup.addMethod(yup.string, 'noWhiteSpaces', function (message: string) {
      return this.test({
            name: 'noWhiteSpaces',
            message: message || `should not contain white spaces`,
            test: (value) => {
                  if (!value) return true;

                  return !new RegExp(` `, 'g').test(value);
            },
      });
});

yup.addMethod(yup.string, 'onlyLatinCharacters', function (message: string) {
      return this.test({
            name: 'onlyLatinCharacters',
            message: message || `should contain only latin characters`,
            test: (value) => {
                  if (!value) return true;

                  return !new RegExp(`[^a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};':"\\\\|,.<>\\/? ]`, 'g').test(value);
            },
      });
});

export const yupPassword = yup.string() as YupPasswordExtend;
