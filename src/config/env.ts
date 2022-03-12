import dotenvSafe from 'dotenv-safe';
import path from 'path';

// Load environment configuration
dotenvSafe.config({
  path: path.resolve(__dirname, '..', '..', '.env'),
  example: path.resolve(__dirname, '..', '..', '.env.example'),
});

export const {
  RPC_HOST,
  ME_API_URL,
  DISCORD_TOKEN,
  DISCORD_CLIENT_ID,
  DISCORD_GUILD_ID,
} = <{ [key: string]: string }>process.env;
