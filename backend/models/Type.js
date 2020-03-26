const mongoose = require('mongoose');

let TypeSchema = mongoose.Schema({
  name: String
})

module.exports = mongoose.model('Type', TypeSchema)
