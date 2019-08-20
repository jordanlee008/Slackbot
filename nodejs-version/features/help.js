module.exports = function(controller) {
  controller.hears('help', 'message', async(bot, message) => {
   var help_response = [ "I'M HERE TO HELP", "yeah sorry can't do that", "do it yourself" ];
   bot.reply(message, help_response[Math.floor(Math.random() * help_response.length)]);
   var help_reaction = { 
     name: 'helpbutton',
     timestamp: message.ts,
     channel: message.channel
   };
   await bot.api.reactions.add(help_reaction);
  });
}
