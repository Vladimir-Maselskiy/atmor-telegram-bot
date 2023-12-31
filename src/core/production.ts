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

  if (req.method === 'POST') {
    console.log('typeof req.body', typeof req.body);
    console.log('body', req.body);
    if (typeof req.body === 'string') {
      const body = JSON.parse(req.body);
      const { fromSite, message }: { fromSite: boolean; message?: string } =
        body;
      fromSite === true && message && (await sendMessageFromSite(bot, message));
      res.status(201).json({ status: 'SENDED' });
    }
    if (typeof req.body === 'object') {
      const { message, update_id } = req.body;
      message &&
        update_id &&
        (await bot.handleUpdate(req.body as unknown as Update, res));
    }
  } else {
    res.status(200).json('Listening to bot events...');
  }
};
