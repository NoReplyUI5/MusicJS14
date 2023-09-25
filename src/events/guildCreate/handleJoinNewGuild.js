import { Routes } from "discord.js";
import config from "../../config.js";
import getLocalCommands from "../../utils/getLocalCommands.js";
export default async ({ client, rest, args }) => {
  const localCommands = await getLocalCommands();
  if (args.id) {
    try {
      await (async () => {
        await rest.put(
Routes.applicationGuildCommands(config.clientId, args.id),
          {
            body: localCommands,
          }
        );
      })();
      console.log(`Commands added to new registered server: ${args.name} / Id: ${args.id}.\n`);
    } catch (error) {
      console.log(
        `An error occurred while registering/updating to new server: ${args.name} / Id: ${args.id}.\nError: ${error}`
      );
    }
  }
};
