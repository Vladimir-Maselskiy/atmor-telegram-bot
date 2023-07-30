import { Context, Telegraf } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';
import { getAllSignedUsers } from '../mongo/getAllSignedUsers';

export const sendMessageFromSite = async (
  bot: Telegraf<Context<Update>>,
  message: string
) => {
  const users = await getAllSignedUsers();
  console.log('users', users);
  //   if (users) {
  //     users.forEach(user => {
  //       bot.telegram.sendMessage(user.userID, message);
  //     });
  //   }
  bot.telegram.sendMessage(915873774, 'test message');
};
