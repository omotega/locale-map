import mongoose from 'mongoose';
import config from '../../config/env';
import { locationModel } from '../model/location';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const value = require('./seed.json');

const start = async () => {
  try {
    await mongoose.connect(config.MONG0_URI);
    await locationModel.deleteMany();
    await locationModel.create(value);
    console.log('Success!!!!');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
