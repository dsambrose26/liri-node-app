const fs = require('fs'); 
const request = require('request');
const dotenv = require("dotenv").config();
const keys = require("./keys.js");
const Twitter = require("twitter");

// Grabs the command from the terminal
const command = process.argv[2];
const searchValue = "";

// Puts together the search value into one string
for (const i = 3; i < process.argv.length; i++) {
    searchValue += process.argv[i] + " ";
};

// Error Functions 
function errorFunction(respError) {
    if (respError) {
        return console.log("Error occured: ", respError);
     }
};

// For logging to log.txt
function errorFunctionStart (respError) {
    errorFunction();
    console.log("\nxxxx Log Started xxxx");
};

function errorFunctionEnd (respError) {
    errorFunction();
    console.log("xxxx Log Ended xxxx");
};

// -------------------- Twitter my-tweets ----------------------------
function getTweets() {

    // Accesses Twitter Keys
    const client = new Twitter(keys.twitter); 
    const params = {
        screen_name: 'DeeCodday',
        count: 12
        };

        client.get('statuses/user_timeline', params, function(respError, tweets, response) {

            errorFunction();
    
            fs.appendFile("log.txt", "-----Tweets Log Entry Start-----\n\nProcessed at: \n" + Date() + "\n\n" + "terminal commands: \n" + process.argv + "\n\n" + "Data Output: \n\n", errorFunctionStart());
    
            console.log("\n-------------- Derek's Latest Tweets --------------\n");
    
            for (i = 0; i < tweets.length; i++) {
                console.log(i + 1 + ". Tweet: ", tweets[i].text);
    
                // For alingment once the number of the tweet is 10 or higher
                if (i + 1 > 9) {
                    console.log("    Tweeted on: ", tweets[i].created_at + "\n");
                } else {
                    console.log("   Tweeted on: ", tweets[i].created_at + "\n");
                }  
                
                fs.appendFile("log.txt", (i + 1) + ". Tweet: " + tweets[i].text + "\nTweeted on: " + tweets[i].created_at + "\n\n", errorFunction());
            };
    
            console.log("--------------------------------------------------\n");
    
            fs.appendFile("log.txt", "-----Tweets Log Entry End-----\n\n", errorFunctionEnd());
        });
    };