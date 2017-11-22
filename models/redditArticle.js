const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RedditArticleSchema = new Schema({
    articleTitle: { type: String },
    articleLink: { 
      type: String,
      unique: true
      },
    thumbnail: { type: String },
    notes: [{ type: Schema.Types.ObjectId, ref: "Note" }],
    dateAdded: { type: Date, default: Date.now }
  });

var RedditArticle = mongoose.model("RedditArticle", RedditArticleSchema);

module.exports = RedditArticle;