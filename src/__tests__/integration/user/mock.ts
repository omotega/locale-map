import argon from 'argon2';

export const verifySpy = jest.spyOn(argon, 'verify');
export const hashSpy = jest.spyOn(argon, 'hash');
