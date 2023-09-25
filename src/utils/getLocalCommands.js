import { join } from "path";
import getAllFilesFromPath from "./getAllFilesFromPath.js";
import getCurrentPath from "./getCurrentPath.js";
export default async (exceptions = []) => {
  const __dirname = getCurrentPath(import.meta.url);
  const commandCategories = getAllFilesFromPath(
    join(__dirname, "..", "commands"),
    true
  );
  const localCommands = [];
  for (const commandCategory of commandCategories) {
    const commandFiles = getAllFilesFromPath(commandCategory);
    for (const commandFile of commandFiles) {
      const fileNameAndParent = commandFile
        .replace(/\\/g, "/")
        .split("/")
        .slice(-2);
      try {
        const commandObject = await import(
`../commands/${fileNameAndParent[0]}/${fileNameAndParent[1]}`
        );
        if (
          commandObject.default.name &&
!exceptions.includes(commandObject.default.name)
        ) {
localCommands.push(commandObject.default);
        }
      } catch (error) {
        console.log("\nThere was an error while importing object: " + error);
      }
    }
  }
  return localCommands;
};