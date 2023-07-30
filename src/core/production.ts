import { VercelRequest, VercelResponse } from '@vercel/node';
import { Context, Telegraf } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';

const VERCEL_URL = `${process.env.VERCEL_URL}`;

const production = async (
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
    if (req.body.fromSite === true) {
      console.log('fromSite : true');
      bot.telegram.sendMessage(915873774, JSON.stringify(req.body));
    } else {
      await bot.handleUpdate(req.body as unknown as Update, res);
    }
    res.status(200).json(req.body);
  } else {
    res.status(200).json('Listening to bot events...');
  }
};
export { production };
