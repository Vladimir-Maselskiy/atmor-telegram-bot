import { Context } from 'telegraf';
import { findOne } from '../mongo/findOne';
import { deleteUser } from '../mongo/DeleteUser';

export const logOut = () => async (ctx: Context) => {
  const user = await deleteUser(ctx);
  if (user) {
    await ctx.reply('Підписку скасовано');
    return;
  }
  await ctx.reply('Підписку не знайдено');
};
