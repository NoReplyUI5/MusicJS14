export default () => {
  return {
    embeds: [
      {
        author: {
          name: `NoReply`,
          icon_url: "",
        },
        color: 16777215,
        type: "rich",
        description: `**NoReplyUI5** supports youtube links, queries and playlists.`,
        title: "NoReplyUI5",
        fields: [
          {
            name: "Commands",
            value: `\n:loud_sound: **/play url** - Paste a link.\n**:loud_sound: /play search** - Searched for music.\n:loud_sound: **/play playlist** - Play from a playlist.\n:pause_button: **/pause** - Pause a music.\n:play_pause: **/resume** - Resume a music.\n:track_next: **/skip** - Skip a music.\n:x: **/stop** - Stop a music.`,
          },
        ],
      },
    ],
    ephemeral: true,
  };
};
