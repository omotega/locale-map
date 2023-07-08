import argon from 'argon2';
import { v4 } from 'uuid';
import crypto from 'crypto';

async function hashPassword(password: string): Promise<string> {
  const hashedPassword = await argon.hash(password);
  return hashedPassword;
}

async function comparePassword(
  hash: string,
  password: string
): Promise<boolean> {
  const isMatch = await argon.verify(hash, password);
  return isMatch;
}

async function genApiKey(): Promise<string> {
  const value = v4();
  const apikey = `locale_${value}`;
  return apikey;
}

async function genKey(): Promise<string> {
  const key = crypto.randomBytes(16).toString('hex');
  return key;
}

async function capitalizeFirstletter(str: any) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default {
  hashPassword,
  comparePassword,
  genApiKey,
  genKey,
  capitalizeFirstletter
};
