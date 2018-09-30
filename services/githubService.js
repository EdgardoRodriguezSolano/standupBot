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
    constructor(ts, tc){
        this.octokit = octokit;
        this.octokit.authenticate({
            type: 'oauth',
            token: process.env.githubToken
          });
        this.tc = tc;
        this.ts = ts;
    }

    /**
     * Returns all the repos for the token authenticated user
     */
    getAll(){
        octokit.repos.getAll({
            'affiliation': 'owner'
        }).then(({ data, headers, status }) => {
            console.log(data);
        })    
    };

    /**
     * Returns a JSON object with all the issues for a specific gitHub repo and forwards it to the bot chat
     * @param {string} repo
     * @param {TelegramService} ts
     */
    getForRepo(repo){
        octokit.issues.getForRepo({
            owner: process.env.githubOwner,
            repo: repo
          }).then(({ data, headers, status }) => {
            // handle data
            for (var key in data)
                this.tc.getCards(data[key].title, data[key].body);
            }) 
            
    }
}

module.exports = GithubService;
