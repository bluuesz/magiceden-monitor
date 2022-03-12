import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { DISCORD_TOKEN } from './config/env';
import { redis } from './config/redis';
import { discordClient } from './discord';
import { offerEmbed } from './discord/rich-embeds/offer-embed';
import { sendMessageEmbed } from './services/discord/send-rich-embed';
import { getNFTsByMintAddresses } from './services/me/get-nfts-by-mintAddresses';
import { Offer } from './services/me/get-offers';
import { logger } from './utils/logger';

const subscribeToChannels = () => {
  redis.subscribe('NOTIFY_DISCORD', (err, count) => {
    if (err) logger.error(err.message);
    logger.info(`Subscribed to ${count} channels.`);
  });
};

const notify = async () => {
  const client = discordClient();
  await client.login(DISCORD_TOKEN);
  subscribeToChannels();
  redis.on('message', async (channel, message) => {
    if (channel === 'NOTIFY_DISCORD') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const offer = JSON.parse(message) as Offer;

      const {
        results: [nftData],
      } = await getNFTsByMintAddresses([
        offer.initializerDepositTokenMintAccount,
      ]);

      const offerLink = `https://magiceden.io/item-details/${offer.initializerDepositTokenMintAccount}`;
      const offerAmount = `${offer.bidderAmountLamports / LAMPORTS_PER_SOL}◎ `;

      const embed = offerEmbed(
        nftData.title,
        offerLink,
        offerAmount,
        nftData.img
      );

      await sendMessageEmbed(
        client,
        '949722983264575521',
        embed,
        `<@612741651798032574> New offer received`
      );
    }
  });
};

notify().catch(logger.error);
