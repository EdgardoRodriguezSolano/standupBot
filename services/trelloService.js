const config = require('../config');
const request = require('request');
const util = require('util');
/**
 * Trellos API class
 * https://developers.trello.com/v1.0/reference#lists-1
 */
class TrelloService {
        constructor(ts){
            this.request = request;
            this.boardId = process.env.trelloBoardId;
            this.ts = ts;
            this.backlogListId = null;
        }
        getLists(){
           // Gets a board lists, creates them if non-existent
           const options = {
                    method: 'GET',
                    url: 'https://api.trello.com/1/boards/'+this.boardId+'/lists',
                    qs:  {key: process.env.trelloKey,
                        token: process.env.trelloToken},
            };        
            request(options, (error, response, body) => {
                if (error) throw new Error(error);
                    let boards_list = JSON.parse(body);
                    (this.getBoardByName('Backlog', boards_list).length >= 1) ?this.backlogListId=this.getBoardByName('Backlog', boards_list)[0].id:this.createList(this.boardId, 'Backlog'); //Asigna id existente. Lo crea de otra forma.
                    (this.getBoardByName('To do', boards_list).length >= 1) ?console.log('Existe la lista to do'):this.createList(this.boardId, 'To do');
                    (this.getBoardByName('Done', boards_list).length >= 1) ?console.log('Existe la lista done'):this.createList(this.boardId, 'Done');
                });
        }

        /**
         * Get a list of all the existing cards in a Trello board
         * @param {string} idBoard
         * @param {string} name
         */
        getCards(title, desc){ //data viene de Github

            const options = {
                method: 'GET',
                url: 'https://api.trello.com/1/boards/'+this.boardId+'/cards',
                qs:  {key: process.env.trelloKey,
                    token: process.env.trelloToken},
        };        
        request(options, (error, response, body) => {
            if (error) throw new Error(error);
                let cards_list = JSON.parse(body);
                (this.getBoardByName(title, cards_list).length >= 1) ?console.log('Existe el issue en Trello - ' + title):this.createCard(title, desc);
            });
        }

        getBoardByName(name, data) {
            return data.filter(
                function(data){ return data.name == name }
            );
          }
         
        /**
         * Creates a new list on a Trello board
         * @param {string} idBoard
         * @param {string} name
         */
        createList(idBoard, name){
            // Create a new list on the board
            const options = {
                    method: 'POST',
                    url: 'https://api.trello.com/1/lists',
                    qs: {
                    name: name,
                    idBoard: idBoard,
                    key: process.env.trelloKey,
                    token: process.env.trelloToken
                },
            };
            request(options, (error, response, body) => {
            if (error) throw new Error(error);
                console.log(body);
                let created_list = JSON.parse(body);
                this.backlogListId = created_list.id;
                this.ts.sendMessage(process.env.telegramChatId, config.text.create_list + name);
            });
        }

        createCard(name, description){
            const options = { 
                    method: 'POST',
                    url: 'https://api.trello.com/1/cards',
                    qs: { idList: this.backlogListId,
                          name: name,
                          desc: description,
                          keepFromSource: 'all',
                          key: process.env.trelloKey,
                          token: process.env.trelloToken
                },
             };

            request(options, (error, response, body)  => {
            if (error) throw new Error(error);
                console.log(body);
                let added_cards = JSON.parse(body);
                this.ts.sendMessage(process.env.telegramChatId, "Agregando a Backlog el issue \n\n"+ added_cards.name + " - " + added_cards.desc);
            });
        }
}

module.exports = TrelloService;