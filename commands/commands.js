module.exports = {
  name: "commands",
  description: "Hello Geeks!",
  execute(message, args) {
    message.channel.send(
      `To interact with the BOT, kindly run the following commands:
      
    To view a Token Balance for an address: 
          /token {token_name}
          e.g: /token molochdao

    To view a Token transaction for an address:
          /tran {token_name or address_string}

    To get the latest Block Height:
          /block
    
    To view a SINGULAR transaction for an address:
            /tran {address_string}

    To view NFT token IDs for an address:
            /tran {token_name or address_string}`
    );
  },
};
