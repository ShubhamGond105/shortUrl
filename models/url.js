const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  redirectURL: {
    type: String,
    required: true
  },
  shortId: {
    type: String,
    required: true,
    unique: true
  },
  visitHistory: [{
    type: Date,
    default: Date.now
  }],
  // You can add more fields as needed, such as metadata or user information
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;