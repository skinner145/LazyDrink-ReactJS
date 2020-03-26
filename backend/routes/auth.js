/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-13T17:39:44+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-02-17T14:42:23+00:00
 */
 //auth routes
 //import passport and jwt for user auth
const passport = require('passport');
const settings = require('../config/passport')(passport);
const jwt = require('jsonwebtoken');
const router = require('express').Router();

let User = require('../models/User');
let Pub = require('../models/Pub');

router.post('/register', (req, res) => {
  //setting values to values passed with reigster route through axios
  const { body } = req;
  const {
    password
  } = body;
  let {
    email
  } = body;
  let {
    name
  } = body;
  let {
    address
  } = body;
  let {
    tables
  } = body;

//validating user input
  if(!name) {
    return res.json({
      success: false,
      message: 'Error: name cannot be blank'
    });
  }
  if(!address){
    return res.json({
      success: false,
      message: 'Error: address cannot be blank'
    });
  }
  if(!tables){
    return res.json({
      success: false,
      message: 'Error: tables cannot be blank'
    })
  }
  if(!email){
    return res.json({
      success: false,
      message: 'Error: email cannot  be blank'
    })
  }
  if(!password){
    return res.json({
      success: false,
      message: 'Error: password cannot be blank'
    });
  }
  //setting email to lowercase and trimming it
  email = email.toLowerCase();
  email = email.trim();
//mkaing sure the user does not already exist
  Pub.find({
    email: email
  },(err, previousUsers) => {
    if(err){
      return res.json({
        success: false,
        message: 'Error: Server Error'
      });
    }
    else if(previousUsers.length > 0) {
      return res.json({
        success: false,
        message: 'Error: Account already exists'
      });
    }
    //create new user using User model
    const newPub = new Pub();
    newPub.name = name;
    newPub.address = address;
    newPub.tables = tables;
    newPub.email = email;
    newPub.password = newPub.generateHash(password);
    newPub.save((err, user) => {
      if(err){
        return res.json({
          success: false,
          message: 'Error: server error'
        });
      }
      //create session for user
      let token = jwt.sign(user.toJSON(), 'mernauth');
      let pubId = user._id;
      return res.json({
        success: true,
        message: 'Account created for Pub',
        token: 'JWT ' + token,
        pubId: pubId
      });
    });
  });
});

router.post('/login', (req, res)=> {
  //setting variables to values passed with axios login route
  const { body } = req;
  const { password } = body;
  let { email } = body;
//validating the user input
  if(!email) {
    return res.json({
      success: false,
      message: 'Error: Email cannot be blacnk'
  });
  }
  if(!password) {
    return res.json({
      success: false,
      message: 'Error: Password cannot be blank'
    });
  }
  //setting email to lowercase and trim
  email = email.toLowerCase().trim();

  //checking is user exists
  Pub.findOne({ email }, function(err, user) {
    if(err) throw(err);

    if(!user){
      res.status(401).json({success: false, message: 'Authentication failed. Pub not found'});
    }
    else{
      //if user exists create session and information correct
      if(user.validPassword(password)){
        let token = jwt.sign(user.toJSON(), 'mernauth');
        let pubId = user._id;
        res.json({
          message: 'Pub found, logged in',
          success: true,
          token: 'JWT ' + token,
          pubId: pubId
        });
      }
      else {
        res.status(401).json({success: false, message: 'Authentication failed. Wrong password.'});
      }
    }
  });
})
module.exports = router;
