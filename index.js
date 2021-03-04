const fs = require("fs");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const querystring = require("querystring");
const trim = (str, max) =>
  str.length > max ? `${str.slice(0, max - 3)}...` : str;
// const Axios = require("axios");

const URL = "https://aws.random.cat/meow";

const URLL = "https://api.covalenthq.com/v1/137/block_v2/latest/?key=API_KEY";

// Creates a discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const { TOKEN } = require("./config");
const prefix = "/";
// const check = require("./apiRequests");

client.once("ready", () => {
  console.log("Ready!");
});

// Runs whenever a message is sent
client.on("message", async (message) => {
  if (message.content === "/see") {
    try {
      const { data } = await fetch(URLL)
        .then((response) => response.json())
        .catch((error) => message.reply(error));

      console.log(data);

      message.channel.send(data.items[0].height);
      message.reply("signed at");
      message.channel.send(data.items[0].signed_at);
      console.log("data");
    } catch (error) {
      console.log(error);
    }
  }

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (message.content === "/check") {
    try {
      const { file } = await fetch(URL)
        .then((response) => response.json())
        .catch((error) => message.reply(error));

      console.log(file);
      message.reply("Works");
      message.channel.send(file);

      console.log("data");
    } catch (error) {
      console.log(error);
    }
  }

  // }

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});

client.login(TOKEN);
