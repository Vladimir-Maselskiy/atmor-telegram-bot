import { Context } from 'telegraf';

const signIn = () => async (ctx: Context) => {
  await ctx.replyWithMarkdownV2('Enter password:', {
    parse_mode: 'Markdown',
  });
};

export { signIn };
