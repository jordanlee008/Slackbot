const { Botkit } = require('botkit');
require('dotenv').config();

const { SlackAdapter, SlackEventMiddleware, SlackMessageTypeMiddleware } = require('botbuilder-adapter-slack');

if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET || !process.env.PORT || !process.env.VERIFICATION_TOKEN) {
  console.log('Error: Specify CLIENT_ID, CLIENT_SECRET, VERIFICATION_TOKEN and PORT in environment');
  process.exit(1);
} else {
  console.log('Good job, you have the variables!')
}

const adapter = new SlackAdapter({
 // for webhook endpoint
 verificationToken: process.env.VERIFICATION_TOKEN,
 clientSigningSecret: process.env.CLIENT_SIGNING_SECRET,
 
 // auth token for single-team app
 botToken: process.env.BOT_TOKEN,
 
 // oath for multi-team app
 clientId: process.env.CLIENT_ID,
 clientSecret: process.env.CLIENT_SECRET,
 scopes: ['commands', 'bot', 'incoming_webhook', 'im:write', 'users.profile:read' ], 
 redirectUri: 'https://jordanlee.localtunnel.me/install/auth',
      
 // storage 
 json_file_store: __dirname + './db_slackbutton_bot/'
});

adapter.use(new SlackEventMiddleware());
adapter.use(new SlackMessageTypeMiddleware());

const controller = new Botkit({
 webhook_uri: '/api/messages',
 adapter: adapter
});

var bot = controller.spawn({token: controller.adapter.botToken});

// once controller setup - load in our functionality
controller.ready(() => {
  controller.loadModules(__dirname + '/features');
});

controller.webserver.get('/', (req, res) => {
  res.send('Running Botkit ${ controller.version }.');
});

controller.webserver.get('/install', (req, res) => {
  res.redirect(controller.adapter.getInstallLink());
});

controller.webserver.get('/install/auth', async(req, res) => {
  try {
    const results = await controller.adapter.validateOauthCode(req.query.code);
    console.log('FULL OAUTH DETAILS', results);
    res.json('Success! Bot installed.');
  } catch (err) {
    console.error('OAUTH ERROR: ', err);
    res.status(401);
    res.send(err.message);
  }
});
