import { connectMongo } from './connectMongo';
import { User } from '../models/userModel';

export const getAllSignedUsers = async () => {
  try {
    await connectMongo();
    const users = await User.find({});
    if (!users) return undefined;
    return users;
  } catch (error) {
    console.log(error);
  }
};
