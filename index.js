const fs = require("fs");
const Discord = require("discord.js");
// const fetch = require("node-fetch");
const Axios = require("axios");

const URL =
  "https://api.covalenthq.com/v1/137/address/0xe2fcaee675b20a435623d27845dd57042388833f/transactions_v2/?key=API_KEY";

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

const { TOKEN, prefix } = require("./config");
const check = require("./apiRequests");

client.once("ready", () => {
  console.log("Ready!");
});

// Runs whenever a message is sent
client.on("message", async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  // // Checks if the message says "hello"
  // if (command === "hello") {
  //   // Sending custom message to the channel
  //   client.commands.get("hello").execute(message, args);
  // } else if (command.startsWith("creator")) {
  //   client.commands.get("creator").execute(message, args);
  // } else if (command === "server") {
  //   client.commands.get("server").execute(message, args);
  if (message.content === "/check") {
    try {
      const resullt = await Axios.get(URL);
      message.reply("Works");
      message.channel.send(resullt);
    } catch (error) {
      console.log(erro);
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
