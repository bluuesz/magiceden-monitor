import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import {
  DISCORD_TOKEN,
  DISCORD_CLIENT_ID,
  DISCORD_GUILD_ID,
} from '../config/env';
import { logger } from '../utils/logger';

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
  {
    name: 'get-my-offers',
    description: 'Get all current offers',
  },
];

const rest = new REST({ version: '9' }).setToken(DISCORD_TOKEN);

rest
  .put(Routes.applicationGuildCommands(DISCORD_CLIENT_ID, DISCORD_GUILD_ID), {
    body: commands,
  })
  .then(() => logger.info('Successfully registered application commands.'))
  .catch(logger.error);
