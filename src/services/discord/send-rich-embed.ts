import { Client, MessageEmbed } from 'discord.js';

const sendMessageEmbed = async (
  discordClient: Client<boolean>,
  channelId: string,
  embed: MessageEmbed,
  text?: string
) => {
  const channel = discordClient.channels.cache.get(channelId);

  if (!channel) {
    throw new Error(`The channel ${channelId} does not exists`);
  }

  if (!channel.isText()) {
    throw new Error(`The channel ${channelId} is not text`);
  }

  const message = await channel.send({
    embeds: [embed],
    content: text || null,
  });

  return !!message;
};

export { sendMessageEmbed };
