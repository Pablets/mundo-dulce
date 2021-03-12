import mongoose from 'mongoose';
import dotenv from 'dotenv';

const connectDB = async (MONGO) => {

  try {
    const conn = await mongoose.connect(MONGO, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host} | ${conn.connection.name}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
