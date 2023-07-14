import helper from '../../../utils/helper';
import { hashSpy, randomBytesSpy, verifySpy } from './mock';

beforeEach(async () => {
  hashSpy.mockClear();
  verifySpy.mockClear();
  randomBytesSpy.mockClear();
});

test('it should hash a password of string type', async () => {
  const password = 'password';
  const hashedPassword = await helper.hashPassword(password);
  const confirmedPassword = hashedPassword;
  expect(hashSpy).toBeCalledTimes(1);
  expect(hashedPassword).toEqual(confirmedPassword);
});

test('it should verify hashed password', async () => {
  const password = 'password';
  const hashedPassword = await helper.hashPassword(password);
  const verifyPassword = await helper.comparePassword(hashedPassword, password);
  expect(hashSpy).toBeCalledTimes(1);
  expect(verifySpy).toBeCalledTimes(1);
  expect(verifyPassword).toBeTruthy();
});

test('should generate an api key', async () => {
  const apiKey = await helper.genApiKey();
  const confirmKey = apiKey;
  expect(apiKey).toEqual(confirmKey);
});

test('should generate randon string', async () => {
  const randomstring = helper.genRandomStrings();
  const confirmRandomString = randomstring;
  expect(randomstring).toBe(confirmRandomString);
  expect(randomBytesSpy).toBeCalledTimes(1);
});

test('should capitalize the first letter of a string', async () => {
  const value = 'value';
  const capitalizeValue = 'Value';
  const capitalizeFirstLetter = await helper.capitalizeFirstletter(value);
  expect(capitalizeFirstLetter).toEqual(capitalizeValue);
});
