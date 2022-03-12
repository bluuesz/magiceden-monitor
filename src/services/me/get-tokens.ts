import { request } from '../../utils/fetch';
import { ME_API_URL } from '../../config/env';

interface Attribute {
  trait_type: string;
  value: string;
}

interface File {
  uri: string;
  type: string;
}

interface Creator {
  address: string;
  share: number;
}

interface Properties {
  files: File[];
  category: string;
  creators: Creator[];
}

interface Tokens {
  mintAddress: string;
  owner: string;
  supply: number;
  delegate: string;
  collection: string;
  name: string;
  updateAuthority: string;
  primarySaleHappened: number;
  sellerFeeBasisPoints: number;
  image: string;
  externalUrl: string;
  attributes: Attribute[];
  properties: Properties;
}

const getTokens = async (wallet: string, listedOnly: boolean) => {
  // listedOnly does not working with the ME v2 api
  const tokens = await request<Tokens[]>(
    `${ME_API_URL}/v2/wallets/${wallet}/tokens?offset=0&limit=100&listedOnly=${listedOnly.toString()}`
  );

  return tokens;
};

export { getTokens };
