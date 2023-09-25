export default class CooldownController {
  static guildCooldown = [];
  static cooldownTime = 4000;
  static applyCooldown(targetGuildId) {
CooldownController.guildCooldown.push(targetGuildId);
    setTimeout(() => {
      CooldownController.guildCooldown =
     CooldownController.guildCooldown.filter(
          (guildId) => guildId !== targetGuildId
        );
    }, CooldownController.cooldownTime);
  }
  static isOnCooldown(targetGuildId) {
    const isGuildOnCooldown = CooldownController.guildCooldown.find(
      (guildId) => guildId === targetGuildId
    );
    return isGuildOnCooldown ? true : false;
  }
}
