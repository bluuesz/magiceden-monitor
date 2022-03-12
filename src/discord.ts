import { Client, Intents } from 'discord.js';
import { executeOfferCommand } from './discord/commands/get-offers';
import { logger } from './utils/logger';

const discordClient = () => {
  const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

  client.on('ready', () => {
    logger.info(`Logged in as ${client.user?.tag || '[NOT LOGGED]'}!`);
  });

  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'ping') {
      await interaction.reply('Pong!');
    }

    if (interaction.commandName === 'get-my-offers') {
      const embeds = await executeOfferCommand();

      if (embeds.length === 0) {
        await interaction.reply('You have not received any offers atm');
        return;
      }
      await interaction.reply({ embeds });
    }
  });

  return client;
};

export { discordClient };
