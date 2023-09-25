export default (songTitle, userNickname) => {
  return {
    embeds: [
      {
        footer: {
          text: `paused by: ${userNickname}.`,
          icon_url: "",
        },
        author: {
          name: "NoReply",
          icon_url: "",
        },
        color: 16777215,
        type: "rich",
        description: `The song **${songTitle}** has been paused!`,
        title: "NoReplyUI5",
      },
    ],
  };
};
