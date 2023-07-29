import { Context } from 'telegraf';
import { findOne } from '../mongo/findOne';

const signIn = () => async (ctx: Context) => {
  await ctx.reply('Enter password:');
  findOne(ctx);
};

export { signIn };
