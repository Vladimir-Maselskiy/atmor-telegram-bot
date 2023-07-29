import { Context } from 'telegraf';
import { findOne } from '../mongo/findOne';

const signIn = () => async (ctx: Context) => {
  await ctx.reply('Enter password:', {
    reply_markup: {
      force_reply: true,
    },
  });
  findOne(ctx);
};

export { signIn };
