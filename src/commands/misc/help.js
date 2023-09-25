import helpEmbed from "../../embeds/misc/helpEmbed.js";
export default {
  name: "help",
  description: "help command!",
  callback: async (client, interaction) => {
    return await interaction.reply(helpEmbed());
  },
};
