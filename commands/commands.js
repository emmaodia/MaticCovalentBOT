module.exports = {
  name: "commands",
  description: "Hello Geeks!",
  execute(message, args) {
    message.channel.send(
      "You can run the following commands to interact with the BOT: \n\nHello\nCommands\nCreator"
    );
  },
};
