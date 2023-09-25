import skipEmbed from "../../embeds/music/skipEmbed.js";
import checkMemberName from "../../utils/checkMemberName.js";
export default {
  name: "skip",
  description: "Skips the current song",
  callback: async (client, interaction) => {
    const channel = interaction.member.voice.channel;
    if (!channel)
    return interaction.reply({
      content:
        "You need to be in a voice channel to play a song.",
      ephemeral: true,
    });
    const queue = client.player.nodes.get(interaction.guild);
    if (!queue) {
      await interaction.reply({
        content: "There are no songs in the queue.",
        ephemeral: true,
      });
      return;
    }
    queue.node.skip();
    await interaction.reply(
      skipEmbed(
        queue.currentTrack.raw.title,
        checkMemberName(
          interaction.member.nickname,
          interaction.member.user.username
        )
      )
    );
  },
};
