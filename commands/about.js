module.exports = {
  name: "about",
  description: "Hello Geeks!",
  execute(message, args) {
    message.channel.send(
      `This is a Matic CovalentHQ BOT!
        It was built during the EtherPunk Contest 2021.
        The BOT consumes the Covalent Class A endpoints.`
    );
  },
};
