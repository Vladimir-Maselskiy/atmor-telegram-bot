import { VercelRequest, VercelResponse } from '@vercel/node';
import { Context, Telegraf } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';
import { sendMessageFromSite } from '../messages';

const VERCEL_URL = `${process.env.VERCEL_URL}`;

export const production = async (
  req: VercelRequest,
  res: VercelResponse,
  bot: Telegraf<Context<Update>>
) => {
  console.log('in production...');

  if (!VERCEL_URL) {
    throw new Error('VERCEL_URL is not set.');
  }

  const getWebhookInfo = await bot.telegram.getWebhookInfo();
  if (getWebhookInfo.url !== VERCEL_URL + '/api') {
    await bot.telegram.deleteWebhook();
    await bot.telegram.setWebhook(`${VERCEL_URL}/api`);
  }

  if (req.method === 'POST' && req.body) {
    const body = JSON.parse(req.body);
    const { fromSite, message }: { fromSite: boolean; message: string } = body;

    if (fromSite === true) {
      console.log('fromSite', fromSite);
      sendMessageFromSite(bot, message);
    } else {
      console.log('fromSite', fromSite);
      console.log('req.body', req.body);
      await bot.handleUpdate(req.body as unknown as Update, res);
    }
    // res.status(200).json(req.body);
  } else {
    res.status(200).json('Listening to bot events...');
  }
};
