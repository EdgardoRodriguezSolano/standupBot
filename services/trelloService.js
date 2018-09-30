const request = require('request');

/**
 * Trellos API class
 */
class TrelloService {
        constructor(){

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
            });
        }
}

module.exports = TrelloService;