module.exports = {
  name: "help",
  description: "Hello Geeks!",
  execute(message, args) {
    message.channel.send(
      `You can run the following commands to interact with the BOT: 
        /hello
        /commands
        /about
        /creator`
    );
  },
};
