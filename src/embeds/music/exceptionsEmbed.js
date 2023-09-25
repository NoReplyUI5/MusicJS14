export function getQueueEmptyEmbed() {
  return {
    embeds: [
      {
        author: {
          name: "NoReply",
          icon_url: "",
        },
        color: 16777215,
        type: "rich",
        description: `The playlist has come to an end. Music Bot has left the voice channel!`,
        title: "NoReplyUI5",
      },
    ],
  };
}

export function getCooldownEmbed() {
  return {
    embeds: [
      {
        author: {
          name: "NoReply",
          icon_url: "",
        },
        color: 16777215,
        type: "rich",
        description: `Wait a few seconds before sending a new command !`,
        title: "Music Bot",
      },
    ],
    ephemeral: true
  };
}
