import mongoose from 'mongoose';

/**
 * Connects to the MongoDB database.
 * @returns {Promise<void>} A promise that resolves once the connection is established.
 * @throws {Error} If the connection to the database fails.
 */

const connectDB = async () => {
  try {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.connect(`${process.env.MONGODB_PROD}`);
      console.log('Connected to MongoDB in production');
    } else {
      await mongoose.connect(`${process.env.MONGODB_DEV}`);
      console.log('Connected to MongoDB in development');
    }
  } catch (error) {
    throw new Error("Couldn't connect to DB", error);
  }
};

export default connectDB;
