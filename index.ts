import { BotClient } from "@guildedjs/gil";
import { TOKEN } from "./configs";

const client = new BotClient({
  token: TOKEN,
  prefix: "!",
});

client.login();

process.on("unhandledRejection", console.log);
