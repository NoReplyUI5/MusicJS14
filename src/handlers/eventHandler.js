import { join } from "path";
import getAllFilesFromPath from "../utils/getAllFilesFromPath.js";
import getCurrentPath from "../utils/getCurrentPath.js";
export default (client, rest) => {
  const __dirname = getCurrentPath(import.meta.url);
  const eventFolders = getAllFilesFromPath(
    join(__dirname, "..", "events"),
    true
  );
  for (const eventFolder of eventFolders) {
    const eventFiles = getAllFilesFromPath(eventFolder);
    eventFiles.sort((a, b) => a.localeCompare(b));
    const eventName = eventFolder.replace(/\\/g, "/").split("/").pop();
    client.on(eventName, async (args) => {
      for (const eventFile of eventFiles) {
        const fileName = eventFile.replace(/\\/g, "/").split("/").pop();
        try {
          const eventFunction = await import(
            `../events/${eventName}/${fileName}`
          );
          eventFunction.default({
            client,
            rest,
            args,
          });
        } catch (error) {
          console.log(
            "\nThere was an error while importing or executing an event function: " +
              error
          );
        }
      }
    });
  }
};
