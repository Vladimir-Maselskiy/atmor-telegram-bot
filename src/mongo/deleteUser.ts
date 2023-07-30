import { Context } from 'telegraf';
import { connectMongo } from './connectMongo';
import { User } from '../models/userModel';

export const deleteUser = async (ctx: Context) => {
  try {
    await connectMongo();
    const { message } = ctx;
    if (message) {
      const { from } = message;
      const { id: userID } = from;
      const user = await User.findOneAndDelete({ userID });
      if (!user) return undefined;
      return user;
    }
  } catch (error) {
    console.log(error);
  }
};
