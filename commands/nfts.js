const Discord = require("discord.js");
const fetch = require("node-fetch");
const querystring = require("querystring");
const trim = (str, max) =>
  str.length > max ? `${str.slice(0, max - 3)}...` : str;

module.exports = {
  name: "nft",
  description: "Hello Geeks!",
  execute: async (message, args) => {
    if (!args.length) {
      return message.channel.send("You need to supply a search term!");
    }
    try {
      const query = querystring.stringify({ term: args.join(" ") }).slice(5);

      const { data } = await fetch(
        `https://api.covalenthq.com/v1/137/tokens/${query}/nft_token_ids/?key=API_KEY`
      ).then((response) => response.json());

      const { address, items } = data;

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
      message.channel.send(`There is an error with your request`);
    }
  },
};
