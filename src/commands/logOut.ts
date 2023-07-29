import { Context } from 'telegraf';
import { findOne } from '../mongo/findOne';

export const logOut = () => async (ctx: Context) => {
  const user = await DeleteUser(ctx);
  if (user) {
    await ctx.reply('Підписку скасовано');
    return;
  }
  await ctx.reply('Enter password:', {
    reply_markup: {
      force_reply: true,
    },
  });
};
