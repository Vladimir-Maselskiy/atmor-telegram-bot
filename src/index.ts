import { Telegraf, Markup, Context } from 'telegraf';

import { about } from './commands';
import { greeting } from './text';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { production } from './core';

const BOT_TOKEN = process.env.BOT_TOKEN || '';

const bot = new Telegraf(BOT_TOKEN);

function createPersistentMenu(ctx: Context) {
  const menuButtons = Markup.keyboard([['/start', '/about']]).resize();
  ctx.reply('Welcome! Please enter your text:', menuButtons);
}

bot.start(ctx => {
  createPersistentMenu(ctx);
});

bot.command('about', about());
bot.on('message', greeting());
console.log('bot', bot);

//prod mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};
