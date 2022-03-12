import * as anchor from '@project-serum/anchor';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const connection = new anchor.web3.Connection(
  'https://solana-api.projectserum.com/'
); // TODO: change to env-safety

export { connection };
