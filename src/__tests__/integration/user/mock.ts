import argon from 'argon2';
import userrepo from '../../../database/repo/userrepo';

export const verifySpy = jest.spyOn(argon, 'verify');
export const hashSpy = jest.spyOn(argon, 'hash');
export const findByEmail = jest.spyOn(userrepo, 'findUserByEmail');
