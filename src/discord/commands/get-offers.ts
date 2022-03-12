import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { getNFTsByMintAddresses } from '../../services/me/get-nfts-by-mintAddresses';
import { getOffers } from '../../services/me/get-offers';
import { groupBy } from '../../utils/groupBy';
import { offerEmbed } from '../rich-embeds/offer-embed';

const executeOfferCommand = async () => {
  const offers = await getOffers('');

  const groupOffersByMint = groupBy(
    offers.results,
    (offer) => offer.initializerDepositTokenMintAccount
  );

  const embedsPromises = offers.results.map(
    async ({ initializerDepositTokenMintAccount }) => {
      const offer = groupOffersByMint[initializerDepositTokenMintAccount];

      const {
        results: [nftData],
      } = await getNFTsByMintAddresses([initializerDepositTokenMintAccount]);

      const offerLink = `https://magiceden.io/item-details/${initializerDepositTokenMintAccount}`;
      const offersAmount = offer
        .map(
          ({ bidderAmountLamports }) =>
            `${bidderAmountLamports / LAMPORTS_PER_SOL}◎ `
        )
        .join(' ');

      const embed = offerEmbed(
        nftData.title,
        offerLink,
        offersAmount,
        nftData.img
      );

      return embed;
    }
  );

  const embeds = await Promise.all(embedsPromises);

  return embeds;
};

export { executeOfferCommand };
