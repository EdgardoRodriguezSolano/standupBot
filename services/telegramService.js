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


class TelegramService {
    constructor(){
        this.api = api;
        this._textRegexpCallbacks = [];
    }
    sendMessage(chatId, text) {
        const params = {
            chat_id: chatId,
            text: text,
            //reply_markup: JSON.stringify(inlineKeyboard)
            // reply_markup: JSON.stringify({
            //     keyboard: [
            //       ['/setup'],
            //       ['/help'],
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
}

module.exports = TelegramService;
