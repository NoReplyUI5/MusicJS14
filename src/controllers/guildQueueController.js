import QueueController from "./queueController.js";
export default class GuildQueueController {
  static queueControllers = [];
  static getGuildQueueController(targetGuildId) {
    let queueController = GuildQueueController.queueControllers.find(
      (obj) => obj.guildId === targetGuildId
    );
    if (!queueController) {
      const newQueueController = new QueueController();
      newQueueController.guildId = targetGuildId;
      const obj = {
        guildId: targetGuildId,
        queueController: newQueueController,
      };
      GuildQueueController.queueControllers.push(obj);

      queueController = obj;
    }
    return queueController;
  }
}
