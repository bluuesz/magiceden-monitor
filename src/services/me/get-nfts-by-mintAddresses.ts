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
  title: string;
}

interface Mints {
  results: Mint[];
}

const getNFTsByMintAddresses = async (mintAddress: string[]) => {
  const nfts = await request<Mints>(
    `https://api-mainnet.magiceden.dev/rpc/getNFTsByMintAddresses/${mintAddress.join(
      ','
    )}`
  );

  return nfts;
};

export { getNFTsByMintAddresses };
