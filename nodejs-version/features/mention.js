module.exports = function(controller) {
  controller.on(['mention', 'direct_mention'], async(bot, message) => {
   var mention_response = [ "what do you want from me", "zzz", "i'm busy talk to someone else", "Gaius?" ];
   await bot.reply(message, mention_response[Math.floor(Math.random() * mention_response.length)]);
   var egg_reaction = { 
     name: 'fried_egg',
     timestamp: message.ts,
     channel: message.channel
   };
   await bot.api.reactions.add(egg_reaction);
  });
}
