import { DISCORD_TOKEN } from './config/env';
import { discordClient } from './discord';
import { startTasks } from './tasks';
import { logger } from './utils/logger';

const main = () =>
  discordClient()
    .login(DISCORD_TOKEN)
    .then(() => startTasks());

main().catch(logger.error);
