import { Context } from 'telegraf';

const replyToMessage = (ctx: Context, messageId: number, string: string) =>
  ctx.reply(string, {
    reply_to_message_id: messageId,
  });

const greeting = () => async (ctx: Context) => {
  console.log('ctx', ctx);

  const messageId = ctx.message?.message_id;
  const userName = `${ctx.message?.from.first_name} ${ctx.message?.from.last_name}`;

  if (messageId) {
    await replyToMessage(ctx, messageId, `Hello, ${userName}!`);
    await replyToMessage(ctx, messageId, `i am bot!`);
  }
};

export { greeting };
