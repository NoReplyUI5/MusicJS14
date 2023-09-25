export default ({ client, args }) => {
  if (args.id == client.application.id) {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = String(now.getFullYear());
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const formattedDateTime = `${month}/${day}/${year} at ${hours}:${minutes}`;
    if (client.voice.adapters.size > 0) {
      console.log(
        `Music Bot started playing on server: "${args.guild.name}" - Id: ${args.guild.id}. On ${formattedDateTime}.`
      );
    } else {
      const queue = client.player.nodes.get(args.guild);
      if (queue) {
        queue.delete();
      }
      console.log(
        `Music Bot left voice channel on server: "${args.guild.name}" / Id: ${args.guild.id}. On ${formattedDateTime}.`
      );
    }
  }
};
