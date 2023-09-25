export default {
  name: "ping",
  description: "Pong!",
  default_member_permissions: "8",

  callback: (client, interaction) => {
    interaction.reply({
      content: `Pong! ${client.ws.ping}ms`,
      ephemeral: true,
    });
  },
};