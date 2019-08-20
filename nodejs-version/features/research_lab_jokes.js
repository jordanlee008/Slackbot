module.exports = function(controller) {
  controller.on('message', async(bot, message) => {
   if (message.channel == "CF8HWT405") { // check channel for research lab
    if (message.user == "U9LLV00N7" && Math.random() < 0.25) { // check user for lizzie
     var egg_reaction = { 
       name: 'fried_egg',
       timestamp: message.ts,
       channel: message.channel 
     };
     await bot.api.reactions.add(egg_reaction);
    }
    if (message.user == "UJWBK7TPD" && Math.random() < 0.1) { // check user for nitin
     await bot.reply(message, "because you're a dumbass");
    }
    if (message.user == "UF7PFM9LZ" && Math.random() < 0.1) { // check user for steve
     await bot.reply(message, "bodied");
    }
   }
  });
}
