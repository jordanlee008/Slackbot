import logging
import ssl as ssl_lib
import certifi
import slack
import random
import re

import settings
import qotd

# CATCH REGULAR MESSAGES
@slack.RTMClient.run_on(event='message')
def catch_regular_message(**payload):
    data = payload['data']
    if 'subtype' in data:
        return
    user = data['user']
    channel_id = data['channel']
    thread_ts = data['ts']
    # egg lizzie
    if user == 'U9LLV00N7':
        prob = 0
        if channel_id == 'CF8HWT405':
            prob = 0.25
        elif channel_id == 'C9678USMS':
            prob = 1
        elif channel_id == 'C95J1GFBJ':
            prob = 0.5

        if (random.random() < prob):
            webclient = payload['web_client']
            webclient.reactions_add(
                name='fried_egg',
                channel=channel_id,
                timestamp=thread_ts
            )
    # help emoji
    if 'help' in data['text']:
        webclient = payload['web_client']
        webclient.reactions_add(
            name='helpbutton',
            channel=channel_id,
            timestamp=thread_ts
        )
    # qotd
    if 'qotd' in data['text']:
        quotes = qotd.QUOTES
        quote = random.choice(quotes)

        webclient = payload['web_client']
        webclient.chat_postMessage(
            channel=channel_id,
            text=quote
        )
    # thanks
    if 'thank' in data['text'] or 'thx' in data['text']:
        webclient = payload['web_client']
        webclient.chat_postEphemeral(
            channel = channel_id,
            text='you\'re welcome!',
            user=user
        )

# CATCH TAGS FOR THE BOT
@slack.RTMClient.run_on(event='message')
def catch_tag_message(**payload):
    data = payload['data']
    if 'subtype' in data:
        return
    user = data['user']
    channel_id = data['channel']
    thread_ts = data['ts']
    if 'ULW8GCCSF' not in data['text']:
        return

    # @bot help
    if 'help' in data['text']:
        channel_id = data['channel']
        thread_ts = data['ts']
        user = data['user']

        webclient = payload['web_client']
        webclient.chat_postMessage(
            channel=channel_id,
            text="you have to figure it out",
        )
    # @bot egg (list of @people or #channels)
    if 'egg' in data['text']:
        targets = re.findall(r"<@[A-Z,0-9]+>", data['text'])
        targets.remove('<@ULW8GCCSF>')
        channels = re.findall(r"<#[A-Z,0-9]+[|].+>", data['text'])
        webclient = payload['web_client']
        for target in targets:
            im = webclient.im_open(
                user = target[2:-1]
            )
            if (im['ok']):
                webclient.chat_postMessage(
                    channel = im['channel']['id'],
                    text = 'you have been egged by <@' + user + '>\n:fried_egg:'
                )
        for channel in channels:
            webclient.chat_postMessage(
                channel = channel[2:11],
                text = 'this channel has been egged by <@' + user + '>\n:fried_egg:'
            )



if __name__ == "__main__":
    logger = logging.getLogger()
    logger.setLevel(logging.DEBUG)
    logger.addHandler(logging.StreamHandler())
    ssl_context = ssl_lib.create_default_context(cafile=certifi.where())
    slack_token = settings.SECRET_KEY
    slack_client = slack.RTMClient(token=slack_token, ssl=ssl_context)
    slack_client.start()
