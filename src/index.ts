import { Telegraf, Markup, Context } from 'telegraf';

import { about, signIn } from './commands';
import { greeting } from './text';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { production } from './core';
import { COMMANDS } from './const/commands';

const BOT_TOKEN = process.env.BOT_TOKEN || '';

const bot = new Telegraf(BOT_TOKEN);

bot.command('signin', signIn());
bot.on('message', greeting());
console.log('bot', bot);

//prod mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};
