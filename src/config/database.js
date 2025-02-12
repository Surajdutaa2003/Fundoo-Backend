import mongoose from 'mongoose';
import logger from './logger';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const database = async () => {
  try {
    const DATABASE =
      process.env.NODE_ENV === 'test'
        ? process.env.DATABASE_TEST
        : process.env.DATABASE;

    if (!DATABASE) {
      throw new Error("❌ DATABASE environment variable is missing!");
    }

    console.log("🔍 DATABASE URI:", DATABASE); // Debugging step

    await mongoose.connect(DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    logger.info('✅ Connected to the database.');
  } catch (error) {
    logger.error('❌ Could not connect to the database.', error);
    process.exit(1);
  }
};

export default database;
