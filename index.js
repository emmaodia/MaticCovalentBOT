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

  const molochdao = "0xe2fcaee675b20a435623d27845dd57042388833f";
  if (command === "token") {
    if (!args.length) {
      return message.channel.send("You need to supply a search term!");
    }
    try {
      // const query = querystring.stringify({ term: args.join(" ") });
      const query = args.toString();
      console.log(query);
      console.log(args.toString());
      console.log("working");
      console.log(molochdao);

      switch (query) {
        case molochdao:
          query = "0xe2fcaee675b20a435623d27845dd57042388833f";
          return query;

        default:
          break;
      }
      const { data } = await fetch(
        `https://api.covalenthq.com/v1/137/address/${molochdao}/balances_v2/?key=API_KEY`
      ).then((response) => response.json());

      console.log(data);

      console.log("working");
      message.channel.send(data.address);

      const { address, items } = data;
      console.log(address, items);
      const embed = new Discord.MessageEmbed()
        .setColor("#EFFF00")
        .setTitle(address)
        .addFields(
          { name: "Contract Name", value: trim(items[0].contract_name, 1024) },
          {
            name: "Contract Address",
            value: trim(items[0].contract_address, 1024),
          },
          { name: "Balance", value: trim(items[0].balance, 1024) }
        );

      message.channel.send(embed);
    } catch (error) {
      console.log(error);
    }
  }

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
