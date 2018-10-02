const config = require('./config');

class TelegramBot {

    constructor(ts, tc, gh){
      this.ts = ts;
      this.tc = tc;
      this.gh = gh;
      this.config =  {
        githubToken : null,
        githubOwner : null,
        githubRepo : null,
        trelloKey : null,
        trelloToken : null,
        trelloBoardId : null
      }
    }
    init(){
        this.ts.api.on('message', (message) => {
            // Received text message
            console.log(message);
            console.log(message.text);
            if (message.entities) { // True when a '/' command is entered
                (message.text === '/setup') ? this.setup()
                :(message.text === '/help') ? this.help()
                : this.notFound();
            } else {
                 this.ts.sendMessage(process.env.telegramChatId, config.text.welcomeText);
            }           
          });
    }

    help(){
        this.ts.sendMessage(process.env.telegramChatId, config.text.help);
    }
    setup(){
        this.tc.getLists();
        this.gh.getForRepo(process.env.githubRepo);
    }

    notFound(){
        this.ts.sendMessage(config.telegramChatId, config.text.notfound)
    }
}

module.exports = TelegramBot;