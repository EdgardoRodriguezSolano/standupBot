const config = require('../config');
const octokit = require('@octokit/rest')({
  debug: true
})
require('dotenv').config();

// https://octokit.github.io/rest.js/

/**
 * Github API class
 */

class GithubService{
    constructor(){
        this.octokit = octokit;
        this.octokit.authenticate({
            type: 'oauth',
            token: process.env.githubToken
          })

    }

    /**
     * Returns all the repos for the token authenticated user
     */
    getAll(){
        octokit.repos.getAll({
            'affiliation': 'owner'
        }).then(({ data, headers, status }) => {
            // handle data
            console.log(data);
        })    
    };

    /**
     * Returns a JSON object with all the issues for a specific gitHub repo and forwards it to the bot chat
     * @param {string} repo
     * @param {TelegramService} ts
     */
    getForRepo(repo, ts){
        octokit.issues.getForRepo({
            owner: process.env.githubOwner,
            repo: repo
          }).then(({ data, headers, status }) => {
            // handle data
            for (var key in data)
                {console.log("\n\n"+ data[key].url + "\n" + data[key].body+ "\n\n");
                ts.sendMessage(process.env.telegramChatId, "\n\n"+ data[key].title + "\n" + data[key].body+ "\n\n");}
                return data;
            })   
    }
}

module.exports = GithubService;
