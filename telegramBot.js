class TelegramBot {

    constructor(ts, tc, gh){
      this.ts = ts;
      this.tc = tc;
      this.gh = gh;
    }
    
    init(){
        this.ts.api.on('message', (message) => {
            // Received text message
            console.log(message);
            console.log(message.text);
            if (message.entities) { // True when a '/' command is entered
              if (message.text === '/get') {
                this.ts.sendMessage(process.env.telegramChatId, config.text.get);
                gh.getForRepo(process.env.githubRepo, this.ts);
              } else
              if (message.text === '/bla') {
                this.tc.getCards();
              }else
              if (message.text === '/create') {
                this.ts.sendMessage(process.env.telegramChatId, config.text.added_card);
                //tc.createCard();
                this.gh.getForRepo(process.env.githubRepo);
              } else
              if (message.text === '/help') {
                ts.sendMessage(process.env.telegramChatId, config.text.help);
                this.tc.getLists();
              } else
              if (message.text === '/setup') {
                this.ts.sendMessage(process.env.telegramChatId, config.text.setup);
                this.tc.createList(process.env.trelloBoardId, 'Done');
                this.tc.createList(process.env.trelloBoardId, 'To do');
                this.tc.createList(process.env.trelloBoardId, 'Backlog');
                this.ts.sendMessage(process.env.telegramChatId, config.text.create_lists);
              } else {
                this.ts.sendMessage(process.env.telegramChatId, config.text.notfound);
              }
              //  (message.text === '/get') ?ts.sendMessage(config.telegramChatId, config.text.help)
              //  : (message.text === '/setup') ?ts.sendMessage(config.telegramChatId, config.text.help)
              //  : (message.text === '/help') ?ts.sendMessage(config.telegramChatId, config.text.help)
              //  : ts.sendMessage(config.telegramChatId, config.text.notfound)
            } else {
              this.ts.sendMessage(process.env.telegramChatId, config.text.welcomeText);
            }
          });
    }
}

module.exports = TelegramBot;