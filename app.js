const config = require('./config');
const TelegramService = require('./services/telegramService');
const GithubService = require('./services/githubService');
const TrelloService = require('./services/trelloService');
require('dotenv').config();

// //SENDING MESSAGE TO TELEGRAM
// api.sendMessage({
//     chat_id:  '635006987', // Can we get a chat id?
//     text: 'Este es un mensaje de prueba'
// }).then(function(data)
// {
// console.log(util.inspect(data, false, null));
// })
// .catch(function(err)
// {
// console.log(err);
// });


// api.on('message', function(message)
// {
//     // Received text message
//     console.log(message);
//     console.log(message.text);
//     if (message.entities) {
//       console.log("Esto es un comando");
//     }
// });

// GITHUB CODE WORKING
// const octokit = require('@octokit/rest')({
//   debug: true
// })

// octokit.authenticate({
//   type: 'oauth',
//   token: 'f1d85de96d37b59c49124f60c1109761d515e818'
// })

// octokit.repos.getAll({
//   'affiliation': 'owner'
// }).then(({ data, headers, status }) => {
//   // handle data
//   console.log(data);
// })

// TRELLO WORKING FOR "BOX" CARD DISPLAY
// var request = require("request");

// var options = { method: 'GET',
//   url: 'https://api.trello.com/1/boards/pPy2MGTD',
//   qs:
//    { key: 'b18b73e3387a7c2370b537c37b0dfa14',
//      token: '6a13ebc8cf406d09d71a3dcb9a81095c22cb0f2a09fd961a902775587a69196e' }
// };

// request(options, function (error, response, body) {
//   if (error) throw new Error(error);

//   console.log(body);
// });

const ts = new TelegramService();
const gh = new GithubService();
const tc = new TrelloService();

ts.api.on('message', (message) => {
  // Received text message
  console.log(message);
  console.log(message.text);
  if (message.entities) { // True when a '/' command is entered
    // SENDING MESSAGE TO TELEGRAM
    // console.log("Prueba onText "+ ts.onText(/\/photo/));
    if (message.text === '/get') {
      ts.sendMessage(process.env.telegramChatId, config.text.get);
      gh.getForRepo(process.env.githubRepo, ts);
    } else
    if (message.text === '/create') {
      ts.sendMessage(process.env.telegramChatId, config.text.create);
    } else
    if (message.text === '/help') {
      ts.sendMessage(process.env.telegramChatId, config.text.help);
    } else
    if (message.text === '/setup') {
      ts.sendMessage(process.env.telegramChatId, config.text.setup);
      tc.createList(process.env.trelloBoardId, 'Backlog');
      tc.createList(process.env.trelloBoardId, 'To do');
      tc.createList(process.env.trelloBoardId, 'Done');
      ts.sendMessage(process.env.telegramChatId, config.text.create_lists);
    } else {
      ts.sendMessage(process.env.telegramChatId, config.text.notfound);
    }
    //  (message.text === '/get') ?ts.sendMessage(config.telegramChatId, config.text.help)
    //  : (message.text === '/setup') ?ts.sendMessage(config.telegramChatId, config.text.help)
    //  : (message.text === '/help') ?ts.sendMessage(config.telegramChatId, config.text.help)
    //  : ts.sendMessage(config.telegramChatId, config.text.notfound)
  } else {
    ts.sendMessage(process.env.telegramChatId, config.text.welcomeText);
  }
});
