const router = require('express').Router();

let Order = require('../models/Order')

router.route('/').get(function(req, res){
  Order.find(function(err, orders){
    if(err){
      console.log(err);
    }
    else{
      res.json(orders)
    }
  }).sort({"time": -1}).populate('drinks.drink').populate('user');
})

router.route('/:id').get(function(req, res) {
  let id = req.params.id;
  Order.findById(id, function(err, order){
    res.json(order)
  }).populate('drinks.drink').populate('user')
})

router.route('/create').post(function(req, res){
  const order = req.body;

  const newOrder = new Order(order);

  newOrder.save()
  .then(data => {
    res.json(orders)
  })
  .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router;
