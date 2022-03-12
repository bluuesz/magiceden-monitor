import { request } from '../../utils/fetch';
import { ME_API_URL } from '../../config/env';
import { getTokens } from './get-tokens';

interface Mint {
  id: string;
  price: number;
  mintAddress: string;
  collectionTitle: string;
  collectionName: string;
  img: string;
}

interface ListedMints {
  results: Mint[];
}

const getListedMints = async (wallet: string) => {
  const listedMints = await request<ListedMints>(
    `https://api-mainnet.magiceden.dev/rpc/getNFTsByEscrowOwner/${wallet}`
  );

  return listedMints;
};

export { getListedMints };
