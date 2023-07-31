import { Context, Telegraf } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';
import { getAllSignedUsers } from '../mongo/getAllSignedUsers';

export const sendMessageFromSite = async (
  bot: Telegraf<Context<Update>>,
  message: string
) => {
  const users = await getAllSignedUsers();
  if (users) {
    users.forEach(user => {
      bot.telegram.sendMessage(user.userID, message);
    });
  }

  // Enable graceful stop
  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
};
