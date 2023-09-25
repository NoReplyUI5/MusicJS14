import { PermissionFlagsBits } from "discord.js";
import getLocalCommands from "../../utils/getLocalCommands.js";
import CooldownController from "../../controllers/cooldownController.js";
import { getCooldownEmbed } from "../../embeds/music/exceptionsEmbed.js";
export default async ({ client, args }) => {
  if (!args.isChatInputCommand()) return;
  if (CooldownController.isOnCooldown(args.guildId)) {
    return args.reply(getCooldownEmbed());
  }
  const localCommands = await getLocalCommands();
  const commandObject = localCommands.find(
    (cmd) => cmd.name === args.commandName
  );
  if (!commandObject) return;
  if (commandObject.default_member_permissions) {
    if (!args.member.permissions.has(PermissionFlagsBits.Administrator)) {
      args.reply({
        content:
          "ERROR: Permissions Required 🚫",
        ephemeral: true,
      });
      return;
    }
  }

  CooldownController.applyCooldown(args.guildId);

  await commandObject.callback(client, args);
};
