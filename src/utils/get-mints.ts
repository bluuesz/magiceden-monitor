import * as anchor from '@project-serum/anchor';
import { connection } from '../config/connection';

const getMints = async (wallet: anchor.web3.PublicKey) => {
  const mints = await connection.getParsedTokenAccountsByOwner(wallet, {
    programId: anchor.utils.token.TOKEN_PROGRAM_ID,
  });

  return mints.value;
};

export { getMints };
