const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "block",
  description: "Hello Geeks!",
  execute: async (message, args) => {
    try {
      const { data } = await fetch(
        `https://api.covalenthq.com/v1/137/block_v2/latest/?key=API_KEY`
      ).then((response) => response.json());

      console.log(data);

      console.log("working");

      const { updated_at, items } = data;
      console.log(Date.parse(items[0].signed_at));
      const embed = new Discord.MessageEmbed()
        .setColor("#EFFF00")
        .setTitle(items[0].height)
        .addFields(
          { name: "SIGNED AT", value: items[0].signed_at },
          {
            name: "UPDATED AT",
            value: updated_at,
          }
        );

      message.channel.send(embed);
    } catch (error) {
      console.log(error);
    }
  },
};
