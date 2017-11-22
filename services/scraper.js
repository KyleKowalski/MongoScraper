const cheerio = require("cheerio");
const request = require("request");
const RedditArticle = require('../models/redditArticle');

function scrapeTargetWebsite() {
    request("http://www.reddit.com", (error, response, html) => {
        
        // Load the HTML into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        var $ = cheerio.load(html);

        // With cheerio, find each p-tag with the "title" class
        // (i: iterator. element: the current element)
        $(".thing").each((i, element) => {

            let articleTitle = $(element).find("a.title").text();
            let articleLink = $(element).find("a.title").attr("href");

            if (articleLink.startsWith("/r/")){
                articleLink = "https://www.reddit.com" + articleLink;
            }
            let thumbnail = $(element).find(".thumbnail").find("img").attr("src");

            // Save these results in an object that we'll push into the results array we defined earlier
            RedditArticle.collection.update(
                {articleLink: articleLink},
                {$set: {articleTitle: articleTitle, thumbnail: thumbnail, dateAdded: Date.now()}},
                {upsert: true}
            );
        });
    });
}

module.exports = scrapeTargetWebsite;