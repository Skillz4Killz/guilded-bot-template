import { Command } from "@guildedjs/gil";
import { Message } from "guilded.js";
import { BOT_INVITE_LINK, BOT_SUPPORT_SERVER } from "../../configs";

export default class BotCommand extends Command {
  aliases = ["join", "inv"];
  description = "Invite the bot the your server or join the bots support server to get help.";
  cooldown = {
    seconds: 3,
    allowedUses: 1,
  };

  async execute(message: Message) {
    return await message.reply(
      [`**Invite Link:** ${BOT_INVITE_LINK}`, `**Support Server:** ${BOT_SUPPORT_SERVER}`].join("\n")
    );
  }

  init() {}
}
