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
      this.setting = false;
    }
    
    init(){
        this.ts.api.on('message', (message) => {
            // Received text message
            console.log(message);
            console.log(message.text);
            if (message.entities) { // True when a '/' command is entered
            //   if (message.text === '/get') {
            //     this.ts.sendMessage(process.env.telegramChatId, config.text.get);
            //     this.gh.getForRepo(process.env.githubRepo, this.ts);
            //   } else
            //   if (message.text === '/bla') {
            //     this.tc.getCards();
            //   }else
            //   if (message.text === '/create') {
            //     this.ts.sendMessage(process.env.telegramChatId, config.text.added_card);
            //     //tc.createCard();
            //     this.gh.getForRepo(process.env.githubRepo);
            //   } else
            //   if (message.text === '/help') {
            //     this.ts.sendMessage(process.env.telegramChatId, config.text.help);
            //     this.tc.getLists();
            //   } else
            //   if (message.text === '/setup') {
            //     this.ts.sendMessage(process.env.telegramChatId, config.text.setup);
            //     this.tc.createList(process.env.trelloBoardId, 'Done');
            //     this.tc.createList(process.env.trelloBoardId, 'To do');
            //     this.tc.createList(process.env.trelloBoardId, 'Backlog');
            //     this.ts.sendMessage(process.env.telegramChatId, config.text.create_lists);
            //   } else {
            //     this.ts.sendMessage(process.env.telegramChatId, config.text.notfound);
            //   }
                (message.text === '/get') ?this.get()
                : (message.text === '/setup') ?this.setup()
                : (message.text === '/help') ?this.help()
                : this.notFound();
            } else {
              if (!this.setting)  
                 this.ts.sendMessage(process.env.telegramChatId, config.text.welcomeText);
                 else{
                    (message.text === 'Trello') ?this.setTrello()
                    : (message.text === 'Github') ?this.setGithub()
                    : (message.text === 'trelloKey') ? console.log('set key Trello')
                    : true;
                 }
            }
            
          });
    }

    get(){

    }

    help(){

    }
    setup(){
        this.setting = true;
        this.ts.configMessage(process.env.telegramChatId, config.text.setup, [['Trello'],['Github']]);
    }

    setTrello(){
        console.log("value=>>" + this.ts.configMessage(process.env.telegramChatId, config.text.trello, [['trelloKey'],['trelloToken'],['trelloBoardId']]));

    }

    notFound(){
        return this.ts.sendMessage(config.telegramChatId, config.text.notfound)
    }
}

module.exports = TelegramBot;