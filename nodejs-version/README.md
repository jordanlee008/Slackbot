## Requirements
I am using Botkit version 4.5.0 for Node.js.
Do not use Botkit version 0.6 or 0.7; note that there are no versions in-between 0.7 and 4.0.
I am also using localtunnel to provide an external address to Slack (hopefully this will change).

## Structure
The construction and setup of the bot is located in `bot.js` file.
In order to reconfigure the tokens used to connect to Slack edit the `.env` file.
All interesting functionality is located in the `features/` folder as individual `function.js` files.

## Usage
Use the shell script!
```bash
sh run_bot.sh
```
