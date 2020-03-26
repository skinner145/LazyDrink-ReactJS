const mongoose = require('mongoose')
const Drink = require('./Drink')
const User = require('./User')

let OrderSchema = mongoose.Schema({
  drinks: [{
    drink: { type: mongoose.Schema.Types.ObjectId, ref: 'Drink' },
    price: { type: Number },
    quantity: { type: Number},
    sum: { type: Number }
  }],
  tableNumber: { type: String },
  totalPrice: { type: Number },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  time : { type : Date }
})

module.exports = mongoose.model('Order', OrderSchema);
