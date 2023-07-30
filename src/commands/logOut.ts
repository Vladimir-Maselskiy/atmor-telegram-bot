import { Context } from 'telegraf';
import { deleteUser } from '../mongo/deleteUser';

export const logOut = () => async (ctx: Context) => {
  const user = await deleteUser(ctx);
  if (user) {
    await ctx.reply('Підписку скасовано');
    return;
  }
  await ctx.reply('Підписку не знайдено');
};
