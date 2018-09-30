const Telegram = require('telegram-bot-api');
const config = require('../config');
const util = require('util');
require('dotenv').config();

const api = new Telegram({
    token: process.env.telegramToken,
    updates: {
        enabled: true,
      }
  });

/**
 * Telegram bot API class
 */
class TelegramService {
    constructor(){
        this.api = api;
    }
    /**
     * Sends a message to the Bot chat
     * @param {string} chatId
     * @param {Object} text
     */
    sendMessage(chatId, text) {
        const params = {
            chat_id: chatId,
            text: text,
            //reply_markup: JSON.stringify(inlineKeyboard)
            // reply_markup: JSON.stringify({
            //     keyboard: [
            //       ['Trello'],
            //       ['Github'],
            //     ],
            //     remove_keyboard: true
            //   })
        }
        api.sendMessage(params).then((data) => {
            console.log(util.inspect(data, false, null));
          })
            .catch((err) => {
              console.log(err);
            });

    }

    configMessage(chatId, text, keyboard) {
        //Create your inline keyboard markup
        var inlineKeyboard = {
            inline_keyboard: [
                [
                    {
                        text: 'Trello Key',
                        callback_data: '1'
                    },
                    {
                        text: 'Trello Token',
                        callback_data: '2'
                    },
                    {
                        text: 'Trello Board Id',
                        callback_data: '3'
                    }
                ]
            ]
        };
        const params = {
            chat_id: chatId,
            text: text,
            reply_markup: JSON.stringify(inlineKeyboard)
            // reply_markup: JSON.stringify({
            //     keyboard: keyboard,
            //     remove_keyboard: true
            //   })
        }
        api.sendMessage(params).then((data) => {
            //console.log(util.inspect(data, false, null));
          })
            .catch((err) => {
              console.log(err);
            });
    
        api.on('inline.callback.query', function(msg) {
                var data = msg.data; //Value from 'callback_data' field of clicked button
                console.log(data + "debería enviar mensaje");
                 // (data === '1')?this.sendMessage(process.env.telegramChatId, 'Ok, envíame tu Trello Key')
                // : (data === '2')?this.sendMessage(process.env.telegramChatId, 'Ok, envíame tu Trello Token')
                // :(data === '3')?this.sendMessage(process.env.telegramChatId, 'Ok, envíame tu Trello Board Id')
                // : true;
                //do stuff
            });
    }
}

module.exports = TelegramService;
