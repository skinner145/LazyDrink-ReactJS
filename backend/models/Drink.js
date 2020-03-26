const mongoose = require('mongoose')

const Type = require('./Type');
const User = require('./User')

let DrinkSchema = mongoose.Schema({
  name: String,
  price: Number,
  type: { type: mongoose.Schema.Types.ObjectId, ref: 'Type'},
})

module.exports = mongoose.model('Drink', DrinkSchema);
