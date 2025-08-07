import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export const connectToDB = async () => {
  if (!MONGODB_URI) throw new Error("MONGODB_URI is not defined");

  if (mongoose.connection.readyState >= 1) return;

  return mongoose.connect(MONGODB_URI, {
    dbName: 'wordsy',
  });
};
