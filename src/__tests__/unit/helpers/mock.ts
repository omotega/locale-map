import argon from 'argon2';
import crypto from 'crypto';

export const hashSpy = jest.spyOn(argon, 'hash');
export const verifySpy = jest.spyOn(argon, 'verify');
export const randomBytesSpy = jest.spyOn(crypto, 'randomBytes');
