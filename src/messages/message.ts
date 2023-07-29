import { Context } from 'telegraf';
import { addUserToDB } from '../mongo/addUserToDB';

const replyToMessage = (ctx: Context, messageId: number, string: string) =>
  ctx.sendMessage(string, {
    reply_to_message_id: messageId,
  });

export const message = () => async (ctx: Context) => {
  console.log('ctx in message:', ctx);
  if (
    'message' in ctx.update &&
    'reply_to_message' in ctx.update.message &&
    ctx.update.message.reply_to_message &&
    'text' in ctx.update.message.reply_to_message &&
    'text' in ctx.update.message &&
    ctx.update.message.reply_to_message.text === 'Enter password:'
  ) {
    if (ctx.update.message.text === process.env.TELEGRAM_BOT_PASSWORD) {
      addUserToDB(ctx);
      ctx.reply('Підписку налаштовано');
    } else {
      ctx.reply('Пароль невірний');
      return;
    }
  }
};
