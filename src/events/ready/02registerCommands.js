import { Routes } from "discord.js";
import config from "../../config.js";
import getLocalCommands from "../../utils/getLocalCommands.js";
import getAllGuilds from "../../utils/getAllGuilds.js";
export default async ({ client, rest }) => {
  const localCommands = await getLocalCommands();
  const guilds = await getAllGuilds(client);
  if (localCommands && guilds) {
    var foundErrors = false;
    for (let i = 0; i < guilds.length; i++) {
      const guild = guilds[i];
      try {
        await (async () => {
          await rest.put(
Routes.applicationGuildCommands(config.clientId, guild.id),
            {
              body: localCommands,
            }
          );
        })();
        console.log(`Commands added on server: ${guild.name} / Id: ${guild.id}. ✅`);
      } catch (error) {
        foundErrors = true;
        console.log(
          `An error occurred while registering/updating commands on server: ${guild.name} / Id: ${guild.id}.\nError: ${error} \nPLEASE FIX THIS BEFORE CONTINUE!`
        );
      }
    }

    if (!foundErrors && guilds.length !== 0) {
      console.log(
        "\nAll commands have been added and updated on all servers successfully! It may take a while to be able to use.\n"
      );
    } else if (guilds.length === 0) {
      console.log("Bot is not on any server...");
    }
  }
};
