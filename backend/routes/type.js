/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-14T12:28:57+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-02-17T14:49:48+00:00
 */
const router = require('express').Router();

let Type = require('../models/Type')

//gets all muscles
 router.route('/').get(function(req, res) {
   Type.find(function(err, types){
     if(err){
       console.log(err)
     }
     else{
       res.json(types)
     }
   })
 })

//gets specific muscle
 router.route('/:id').get(function(req, res){
   let id = req.params.id;
   Type.findById(id, function(err, type){
     res.json(type);
   });
 });

module.exports = router;
