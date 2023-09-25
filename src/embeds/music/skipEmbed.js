export default (songTitle, userNickname) => {
  return {
    embeds: [
      {
        footer: {
          text: `Skipped by: ${userNickname}.`,
          icon_url: "",
        },
        author: {
          name: "NoReply",
          icon_url: "",
        },
        color: 16777215,
        type: "rich",
        description: `The song has been skipped.`,
        title: "NoReplyUI5",
      },
    ],
  };
};
