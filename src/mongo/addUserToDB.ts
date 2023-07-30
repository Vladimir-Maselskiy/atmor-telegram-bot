import { Context } from 'telegraf';
import { connectMongo } from './connectMongo';
import { User } from '../models/userModel';
import { TUserForMongoDB } from '../interfaces/userForMongo';
import { getUserForDBFromCtx } from './getUserForDBFromCtx';

export const addUserToDB = async (
  ctx: Context
): Promise<TUserForMongoDB | undefined> => {
  try {
    await connectMongo();
    const { message } = ctx;
    if (message) {
      const { from } = message;
      const { id: userID } = from;
      const user = await User.findOne({ userID });
      if (user) return;
      return await User.create(getUserForDBFromCtx(ctx));
    }
  } catch (error) {
    console.log(error);
  }
};
