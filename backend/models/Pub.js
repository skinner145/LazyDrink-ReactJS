const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const PubSchema = new mongoose.Schema({
  name:{
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  tables: {
    type: Number,
    default: ''
  },
  email:{
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  signUpDate: {
    type: Date,
    default: Date.now()
  }
});

PubSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
};

PubSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('Pub', PubSchema);
