module.exports = function(controller) {
  /*controller.on('slash_command', function(bot, message) {
    console.log('SLASH RECEIVED');
    switch (message.command) {
      case "/egg":
        if (message.text == "") {
          bot.replyPrivate(message, 'you dropped the egg on yourself\n:fried_egg:');
        } else {
  	// bot.replyPrivate(message, 'you have egged ' + message.text);
	console.log('trying to egg ' + message.text);
  	target = message.text.substring(2,11);
  	bot.api.im.open({user: target, token: bot.config.bot.appToken}, (err, res) => {
  	  console.log(res);
  	  bot.startConversation({
  	    user: target,
  	    channel: res.channel.id,
  	    text: 'blah'
  	  }, (err, conv) => {
  	    conv.say('you have been egged\n:fried_egg:');
  	  });
  	});
        }
      break;
      default: 
        bot.replyPrivate(message, 'Did not recognize that command, sorry!')
      break;
   }
  });*/

  controller.on('slash_command', async(bot, message) => {
    console.log(message.command);
    switch (message.command) {
      case '/egg':
	console.log(message.text);
	if (message.text == '') {
	  await bot.replyPrivate(message, 'you dropped an egg\n:fried_egg:');
	} else {
	  try {
	    var target = message.text.substring(2,11);
	    await bot.replyPrivate(message, 'you want to egg ' + message.text);
	    await bot.startPrivateConversation(target);
	    // var source = await bot.api.users.profile.get({user: message.user});
	    // await bot.say('YOU GOT EGGED BY ' + source.profile.real_name);
	    await bot.say('you got egged by ' + message.user_name);
	    await bot.say(':fried_egg:');
	  } catch(err) {
	    console.error('/egg error', err);
	    await bot.replyPrivate(message, 'that isn\'t a person!');
	  }
	}
        break;
      default:
        await bot.replyPrivate(message, '??');
        break;
    }
  });
}
