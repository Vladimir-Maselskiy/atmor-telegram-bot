import { Context } from 'telegraf';
import { findOne } from '../mongo/findOne';

const signIn = () => async (ctx: Context) => {
  const user = await findOne(ctx);
  if (user) {
    await ctx.reply('Підписка вже налаштована');
    return;
  }
  await ctx.reply('Enter password:', {
    reply_markup: {
      force_reply: true,
    },
  });
};

export { signIn };
