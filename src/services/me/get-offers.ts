import { request } from '../../utils/fetch';
import { getListedMints } from './get-listedMints';

export interface Offer {
  _id: string;
  biddingDataPda: string;
  bidderAmountLamports: number;
  bidderPubkey: string;
  collectionSymbol: string;
  createdAt: Date;
  escrowPubkey: string;
  expiryDate: Date;
  experyCacheTime: Date;
  initializerDepositTokenAccount: string;
  initializerDepositTokenMintAccount: string;
  initializerKey: string;
}

interface Offers {
  results: Offer[];
}

const getOffers = async (wallet: string) => {
  const listedMints = await getListedMints(wallet);

  const mintAddresses = listedMints.results.map((token) => token.mintAddress);

  const qs = encodeURIComponent(
    JSON.stringify({
      $match: {
        initializerDepositTokenMintAccount: {
          $in: mintAddresses,
        },
      },
    })
  );

  const offers = await request<Offers>(
    `https://api-mainnet.magiceden.dev/rpc/getBiddingsByQuery?q=${qs}`
  );

  return offers;
};

export { getOffers };
