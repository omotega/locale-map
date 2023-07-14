import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../../../app';
import { LOGIN_SUCCESSFUL } from '../../../utils/constant';
import { hashSpy, verifySpy, findByEmail } from './mock';

const api = supertest(app);

beforeAll(async () => {
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});
afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
});
beforeEach(async () => {
  hashSpy.mockClear();
  verifySpy.mockClear();
  findByEmail.mockClear();
});

describe('POST /api/user/signup', () => {
  test('should create the user and return 201 statuscode', async () => {
    const payload = {
      name: 'tadanam',
      email: 'tadanam@gmail.com',
      password: 'nanananananananan'
    };
    const endpoint = '/api/user/signup';
    const { body } = await api.post(endpoint).send(payload).expect(201);
    expect(body).toHaveProperty('message');
    expect(body.data.user.user).toHaveProperty('password');
    expect(body.data.user.user).toHaveProperty('apiKey');
    expect(body.data.user.user).toHaveProperty('_id');
    expect(hashSpy).toBeCalledTimes(1);
    expect(findByEmail).toBeCalledTimes(1);
  });

  test('should return error if name field is empty', async () => {
    const payload = {
      email: 'tadanam@gmail.com',
      password: 'nanananananananan'
    };
    const endpoint = '/api/user/signup';
    await api.post(endpoint).send(payload).expect(400);
    expect(hashSpy).toBeCalledTimes(1);
    expect(findByEmail).toBeCalledTimes(1);
  });

  test('should return error when the email field is empty', async () => {
    const payload = {
      name: 'tadanam',
      password: 'nanananananananan'
    };
    const endpoint = '/api/user/signup';
    await api.post(endpoint).send(payload).expect(400);
    expect(hashSpy).toBeCalledTimes(1);
    expect(findByEmail).toBeCalledTimes(1);
  });
});

describe(' Post /api/user/login', () => {
  test('should log user in and return statusCode 200', async () => {
    const payload = {
      email: 'tadanam@gmail.com',
      password: 'nanananananananan'
    };
    const endpoint = '/api/user/login';
    const { body } = await api.post(endpoint).send(payload).expect(200);
    expect(body.message).toBe(LOGIN_SUCCESSFUL);
    expect(verifySpy).toBeCalledTimes(1);
    expect(findByEmail).toBeCalledTimes(2);
  });

  test('should return error message when email is missing', async () => {
    const payload = {
      password: 'nanananananananan'
    };
    const endpoint = '/api/user/login';
    await api.post(endpoint).send(payload).expect(400);
    expect(verifySpy).toBeCalledTimes(1);
    expect(findByEmail).toBeCalledTimes(2);
  });

  test('should return error message when password is missing', async () => {
    const payload = {
      email: 'tadanam@gmail.com'
    };
    const endpoint = '/api/user/login';
    await api.post(endpoint).send(payload).expect(400);
    expect(verifySpy).toBeCalledTimes(1);
    expect(findByEmail).toBeCalledTimes(2);
  });
});
