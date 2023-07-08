import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import config from '../config/env';
import logger from '../core/logger';

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(config.MONG0_URI);
    console.log(`db connected at ${conn.connection.host}`);
  } catch (error) {
    logger.debug(error);
    process.exit(1);
  }
};

connectDb();

export default connectDb;
