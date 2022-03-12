import { MessageEmbed } from 'discord.js';

const offerEmbed = (
  title: string,
  offerLink: string,
  offers: string,
  image: string
) =>
  new MessageEmbed()
    .setTitle(title)
    .setURL(offerLink)
    .setAuthor({
      name: 'ME Monitor',
      iconURL:
        'https://raw.githubusercontent.com/cat-milk/Anime-Girls-Holding-Programming-Books/master/SICP/Tenma_Gabriel_Yelling_SICP.png',
    })
    .setColor('#130606')
    .setDescription(`Offers: ${offers}`)
    .setFooter({
      text: '@bluuesz',
    })
    .setThumbnail(image)
    .setTimestamp();

export { offerEmbed };
