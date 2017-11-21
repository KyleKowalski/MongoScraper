const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const noteSchema = new Schema({
    noteText: { type: String },
    dateAdded: { type: Date, default: Date.now }
  });

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;