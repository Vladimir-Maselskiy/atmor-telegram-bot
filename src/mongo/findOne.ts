import { Context } from 'telegraf';
import { connectMongo } from './connectMongo';

export const findOne = async (ctx: Context) => {
  try {
    await connectMongo();
    console.log('ctx in findOne', ctx);
  } catch {}
};
