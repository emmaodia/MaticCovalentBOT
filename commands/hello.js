module.exports = {
  name: "hello",
  description: "Hello Geeks!",
  execute(message, args) {
    message.channel.send("Hello Geeks! Type /help to start !");
  },
};
