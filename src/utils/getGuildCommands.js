export default async (client, guildId) => {
  if (guildId) {
    const guild = await client.guilds.fetch(guildId);
    return guild.commands.fetch();
  }
};
