module.exports = function(controller) {
  controller.on('direct_message', async(bot, message) => {
   var dm_response = [ "hey man i don't want to talk okay", "i don't have any capabilities", "intern is cool" ];
   await bot.reply(message, dm_response[Math.floor(Math.random() * dm_response.length)]);
  });
}
