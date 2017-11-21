const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const vacationSpotSchema = new Schema({
    locationDescription: { type: String },
    image: { type: String },
    comments: [{ body: String, date: Date }],
    dateAdded: { type: Date, default: Date.now }
  });

const VacationSpot = mongoose.model('VacationSpot', vacationSpotSchema);

mongoose.connect('mongodb://localhost/vacationScraper');

module.exports = VacationSpot;