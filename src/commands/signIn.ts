import { Context } from 'telegraf';

const signIn = () => async (ctx: Context) => {
  await ctx.reply('Enter password:');
};

export { signIn };
