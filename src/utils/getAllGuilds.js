export default async (client) => {
  const guildIds = await client.guilds
    .fetch()
    .then((guilds) =>
      guilds.map((guild) => ({ name: guild.name, id: guild.id }))
    );
  return guildIds;
};
