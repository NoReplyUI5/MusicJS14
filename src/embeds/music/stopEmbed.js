export default (userNickname) => {
  return {
    embeds: [
      {
        footer: {
          text: `Stopped by: ${userNickname}.`,
          icon_url: "",
        },
        author: {
          name: "NoReply",
          icon_url: "",
        },
        color: 16777215,
        type: "rich",
        description:
          "Stopped song playback and left the voice channel.",
        title: "NoReplyUI5",
      },
    ],
  };
};
