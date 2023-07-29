import mongoose from 'mongoose';

export const connectMongo = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log('Mongoose already connected');
    return;
  }

  console.log('Connecting mongoose...');
  await mongoose.connect(process.env.MONGO_URI!);
};
