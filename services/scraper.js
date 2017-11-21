const cheerio = require("cheerio");
const request = require("request");
const VacationSpot = require('../models/vacationSpot');

function scrapeTargetWebsite() {
    console.log(`SCRRAAAPPPIINNNNGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG`);
    
    // clean it out so we can start again
    VacationSpot.collection.drop();

    request("https://www.pexels.com/search/vacation/", (error, response, html) => {
        
        // Load the HTML into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        var $ = cheerio.load(html);

        // With cheerio, find each p-tag with the "title" class
        // (i: iterator. element: the current element)
        $("article").each((i, element) => {

            var articleText = $(element).find("a").find("img").attr("alt");
            var imgLink = $(element).find("a").find("img").attr("srcset").split(",")[0].split(" ")[0].split("?")[0];

            // Save these results in an object that we'll push into the results array we defined earlier
            VacationSpot.collection.insert({
                locationDescription: articleText,
                image: imgLink
            });
        });
    });
}

module.exports = scrapeTargetWebsite;