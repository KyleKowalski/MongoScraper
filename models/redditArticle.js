const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const redditArticleSchema = new Schema({
    articleTitle: { type: String },
    articleLink: { type: String },
    thumbnail: { type: String },
    notes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Note"
      }
    ],
    dateAdded: { type: Date, default: Date.now }
  });

const RedditArticle = mongoose.model('RedditArticle', redditArticleSchema);

module.exports = RedditArticle;