import { Command } from "@guildedjs/gil";
import { Embed, Message } from "guilded.js";

export default class BotCommand extends Command {
  aliases = ["h"];
  cooldown = {
    seconds: 3,
    allowedUses: 2,
  };
  arguments = [
    {
      name: "command",
      type: "string",
      required: false,
    },
  ] as const;

  async execute(message: Message, args: HelpCommandArgs) {
    const prefix = this.client.prefixes.get(message.serverId!) ?? this.client.prefix;

    if (!args.command) {
      const embed = new Embed()
        .setAuthor(`List of Bot Commands`)
        .setDescription(`\`${this.client.commands.map((c) => `${prefix}${c.name}`).join("`, `")}\``)
        .setColor("RANDOM")
        .setFooter(`Type ${prefix}help command for more details.`);

      return await message.reply({ embeds: [embed.toJSON()] });
    }

    const command =
      this.client.commands.get(args.command.toLowerCase()) ??
      this.client.commands.find((c) => Boolean(c.aliases?.includes(args.command!.toLowerCase())));
    if (!command) {
      const embed = new Embed()
        .setDescription(`There was no command found called *${args.command}*`)
        .setColor("RANDOM")
        .setFooter(`Type ${prefix}help to view the list of commands.`);

      return await message.reply({ embeds: [embed.toJSON()] });
    }

    const embed = new Embed()
      .setAuthor(`Help For: ${command.name}`)
      .setColor("RANDOM")
      .setDescription(command.description ?? "No help description available.");

    return await message.reply({ embeds: [embed.toJSON()] });
  }

  init() {}
}

export interface HelpCommandArgs {
  command?: string;
}
