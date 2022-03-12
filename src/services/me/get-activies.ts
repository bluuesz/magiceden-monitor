import { request } from '../../utils/fetch';
import { ME_API_URL } from '../../config/env';

interface Activities {
  signature: string;
  type: string;
  source: string;
  tokenMint: string;
  collection: string;
  slot: number;
  blockTime: number;
  buyer: string;
  buyerReferral: string;
  seller: string;
  sellerReferral: string;
  price: number;
}

const getActivies = async (wallet: string) => {
  const activies = await request<Activities[]>(
    `${ME_API_URL}/v2/wallets/${wallet}/activities?offset=0&limit=100`
  );

  return activies;
};

export { getActivies };
