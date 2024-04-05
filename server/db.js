import mongoose from "mongoose";

/**
 * Connects to the MongoDB database.
 * @returns {Promise<void>} A promise that resolves once the connection is established.
 * @throws {Error} If the connection to the database fails.
 */
const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_DEV}`);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw new Error("Couldn't connect to DB", error);
  }
};

export default connectDB;
