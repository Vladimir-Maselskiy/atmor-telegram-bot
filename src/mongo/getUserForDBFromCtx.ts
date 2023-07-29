import { Context } from 'telegraf';
import { TUserForMongoDB } from '../interfaces/userForMongo';

export const getUserForDBFromCtx = (
  ctx: Context
): TUserForMongoDB | undefined => {
  if ('message' in ctx.update) {
    const { first_name, id, last_name, username } = ctx.update.message.from;
    const user: TUserForMongoDB = { userID: id, firstName: first_name };
    if (last_name) user.lastName = last_name;
    if (username) user.userName = username;
    return user;
  }
  return;
};
