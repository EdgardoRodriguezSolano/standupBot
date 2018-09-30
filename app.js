
const TelegramService = require('./services/telegramService');
const GithubService = require('./services/githubService');
const TrelloService = require('./services/trelloService');
const TelegramBot = require('./telegramBot');
require('dotenv').config();

const ts = new TelegramService();
const tc = new TrelloService(ts);
const gh = new GithubService(ts, tc);
const bot = new TelegramBot(ts, tc, gh);

// Let the bot starts listening
bot.init();




