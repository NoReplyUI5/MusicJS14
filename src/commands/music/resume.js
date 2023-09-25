import GuildQueueController from "../../controllers/guildQueueController.js";
import { getPlayButtonRow } from "../../embeds/music/buttonRowEmbed.js";
import resumeEmbed from "../../embeds/music/resumeEmbed.js";
import skipEmbed from "../../embeds/music/skipEmbed.js";
import checkMemberName from "../../utils/checkMemberName.js";
export default {
  name: "resume",
  description: "Resumes the current song.",
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
    const queueController = GuildQueueController.getGuildQueueController(
      interaction.guildId
    ).queueController;
    if (queue.node.isPaused()) {
      queue.node.resume();
      const currentReply =
        queueController.queueReply[queueController.currentTrackIndex];
      currentReply.edit(getPlayButtonRow(true));
      return await interaction.reply(
        resumeEmbed(
          queue.currentTrack.raw.title,
          checkMemberName(
            interaction.member.nickname,
            interaction.member.user.username
          )
        )
      );
    } else {
      return await interaction.reply({
        content: "Bot is already playing!",
        ephemeral: true,
      });
    }
  },
};
