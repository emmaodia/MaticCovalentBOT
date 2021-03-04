const Discord = require("discord.js");
const fetch = require("node-fetch");
const querystring = require("querystring");
const trim = (str, max) =>
  str.length > max ? `${str.slice(0, max - 3)}...` : str;

module.exports = {
  name: "token",
  description: "Hello Geeks!",
  execute: async (message, args) => {
    if (!args.length) {
      return message.channel.send("You need to supply a search term!");
    }
    try {
      const query = querystring.stringify({ term: args.join(" ") }).slice(5);
      // let query = args.toString();

      console.log(query);
      // console.log(args.toString());
      // console.log("working");
      // console.log(molochdao);

      const { data } = await fetch(
        `https://api.covalenthq.com/v1/137/address/${query}/balances_v2/?key=API_KEY`
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
  },
};
