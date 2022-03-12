import { CronJob } from 'cron';
import { getOffers } from '../services/me/get-offers';
import { redis } from '../config/redis';
import { logger } from '../utils/logger';

const CRON = '* * * * *';
const ONE_DAY = 86400;

const pullOffers = async (): Promise<void> => {
  const offers = await getOffers(``);

  logger.info(`Offers length: ${offers.results.length}`);

  offers.results.forEach(async (offer) => {
    const memoize = await redis.get(offer._id);

    if (!memoize) {
      await redis.publish('NOTIFY_DISCORD', JSON.stringify(offer));
      await redis.set(offer._id, JSON.stringify(offer), 'EX', ONE_DAY);

      return;
    }

    const expireTime = await redis.ttl(offer._id);

    // update cached offer
    if (expireTime < 120) {
      await redis.expire(offer._id, ONE_DAY);
    }
  });
};

const cronOffers = () => {
  const Job = new CronJob(CRON, pullOffers, null, true, 'America/Sao_Paulo');
  logger.info(`Starting task runner for pulling current offers [${CRON}]`);
  Job.start();
};

export { cronOffers };
