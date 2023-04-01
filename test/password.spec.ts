import { yupPassword } from '../index';
import * as yup from 'yup';

describe('yupPassword', () => {
      describe(' Happy case', () => {
            const schema = yup.object().shape({
                  data: yupPassword
                        .minOfSpecialCharacters(2)
                        .minOfLowercase(2)
                        .minOfUppercase(2)
                        .minOfNumeric(2)
                        .noWhiteSpaces(),
            });

            it('Pass', async () => {
                  const value = await schema.validate({ data: 'aA@0aA@0' });
                  expect(value).toBeDefined();
            });

            it('Pass all check character', async () => {
                  const error = await schema.validate({
                        data: 'aaAaaaaaaaaaaaaaaaA@@$$$@csacsac00',
                  });
                  expect(error).toBeDefined();
            });
      });

      describe('minOfUppercase', () => {
            const schema = yupPassword.minOfUppercase(2);
            it('Pass', async () => {
                  const value = await schema.validate('aA@0aA@0A');
                  expect(value).toBeDefined();
            });
            it('Failed uppercase characters', async () => {
                  expect.assertions(2);
                  try {
                        await schema.validate('aaA@@00');
                  } catch (error) {
                        expect(error).toBeDefined();
                        expect(error?.name).toBe('ValidationError');
                  }
            });
      });

      describe('minOfLowercase', () => {
            const schema = yupPassword.minOfLowercase(2);
            it('Pass', async () => {
                  const value = await schema.validate('aA@0aA@0a');
                  expect(value).toBeDefined();
            });
            it('Failed lowercase characters', async () => {
                  expect.assertions(2);
                  try {
                        await schema.validate('AA@@00');
                  } catch (error) {
                        expect(error).toBeDefined();
                        expect(error?.name).toBe('ValidationError');
                  }
            });
      });

      describe('minOfSpecialCharacters', () => {
            const schema = yupPassword.minOfSpecialCharacters(2);
            it('Pass', async () => {
                  const value = await schema.validate('aA@0aA@0@');
                  expect(value).toBeDefined();
            });
            it('Failed special characters', async () => {
                  expect.assertions(2);
                  try {
                        await schema.validate('aaA00');
                  } catch (error) {
                        expect(error).toBeDefined();
                        expect(error?.name).toBe('ValidationError');
                  }
            });
      });

      describe('minOfNumeric', () => {
            const schema = yupPassword.minOfNumeric(2);
            it('Pass', async () => {
                  const value = await schema.validate('aA@0aA@0@0');
                  expect(value).toBeDefined();
            });
            it('Failed numeric characters', async () => {
                  expect.assertions(2);
                  try {
                        await schema.validate('aaA@@');
                  } catch (error) {
                        expect(error).toBeDefined();
                        expect(error?.name).toBe('ValidationError');
                  }
            });
      });

      describe('noWhiteSpaces', () => {
            const schema = yupPassword.noWhiteSpaces();
            it('Pass', async () => {
                  const value = await schema.validate('aA@0aA@0@0');
                  expect(value).toBeDefined();
            });
            it('Failed white spaces', async () => {
                  expect.assertions(2);
                  try {
                        await schema.validate('aaA@@ 00');
                  } catch (error) {
                        expect(error).toBeDefined();
                        expect(error?.name).toBe('ValidationError');
                  }
            });
      });

      describe('onlyLatinCharacters', () => {
            const schema = yupPassword.onlyLatinCharacters();
            it('Pass', async () => {
                  const value = await schema.validate('aA@0aA@0@0');
                  expect(value).toBeDefined();
            });

            it('Failed check vietnamese characters', async () => {
                  expect.assertions(2);
                  try {
                        await schema.validate('Xin chào');
                  } catch (error) {
                        expect(error).toBeDefined();
                        expect(error?.name).toBe('ValidationError');
                  }
            });

            it('Failed check chinese characters', async () => {
                  expect.assertions(2);
                  try {
                        await schema.validate('你好');
                  } catch (error) {
                        expect(error).toBeDefined();
                        expect(error?.name).toBe('ValidationError');
                  }
            });

            it('Failed check japanese characters', async () => {
                  expect.assertions(2);
                  try {
                        await schema.validate('こんにちは');
                  } catch (error) {
                        expect(error).toBeDefined();
                        expect(error?.name).toBe('ValidationError');
                  }
            });

            it('Failed check korean characters', async () => {
                  expect.assertions(2);
                  try {
                        await schema.validate('안녕하세요');
                  } catch (error) {
                        expect(error).toBeDefined();
                        expect(error?.name).toBe('ValidationError');
                  }
            });

            it('Failed check arabic characters', async () => {
                  expect.assertions(2);
                  try {
                        await schema.validate('مرحبا');
                  } catch (error) {
                        expect(error).toBeDefined();
                        expect(error?.name).toBe('ValidationError');
                  }
            });

            it('Failed check thai characters', async () => {
                  expect.assertions(2);
                  try {
                        await schema.validate('สวัสดี');
                  } catch (error) {
                        expect(error).toBeDefined();
                        expect(error?.name).toBe('ValidationError');
                  }
            });

            it('Failed check russian characters', async () => {
                  expect.assertions(2);
                  try {
                        await schema.validate('Здравствуйте');
                  } catch (error) {
                        expect(error).toBeDefined();
                        expect(error?.name).toBe('ValidationError');
                  }
            });

            it('Failed check greek characters', async () => {
                  expect.assertions(2);
                  try {
                        await schema.validate('γεια σας');
                  } catch (error) {
                        expect(error).toBeDefined();
                        expect(error?.name).toBe('ValidationError');
                  }
            });

            it('Failed check hebrew characters', async () => {
                  expect.assertions(2);
                  try {
                        await schema.validate('שלום');
                  } catch (error) {
                        expect(error).toBeDefined();
                        expect(error?.name).toBe('ValidationError');
                  }
            });
      });
});
