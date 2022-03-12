import { Client } from 'discord.js';

const sendMessage = async (
  discordClient: Client<boolean>,
  channelId: string,
  text: string
) => {
  const channel = discordClient.channels.cache.get(channelId);

  if (!channel) {
    throw new Error(`The channel ${channelId} does not exists`);
  }

  if (!channel.isText()) {
    throw new Error(`The channel ${channelId} is not text`);
  }

  const message = await channel.send(text);

  return !!message;
};

export { sendMessage };
