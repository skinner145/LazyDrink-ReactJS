const router = require('express').Router();

let Drink = require('../models/Drink')

 router.route('/').get(function(req, res) {
  Drink.find(function(err, drinks){
    if(err){
      console.log(err);
    }
    else{
      res.json(drinks)
    }
  }).populate('type')
})


router.route('/:id').get(function(req, res){
  let id = req.params.id;
  Drink.findById(id, function(err, drink){
    res.json(drink)
  }).populate('type')
})

router.route('/create').post(function(req, res) {
  const drink = req.body;

  const newDrink = new Drink(drink);
  newDrink.save()
  .then(
    data => {
      res.json(data)
    }
  )
  .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id/edit').put((req, res) => {
  const drinkId = req.params.id

Drink.findById(drinkId)
.then(drink => {
  if(!drink){
    return res.status(404).json({
      message: 'Drink not found with id ' + drinkId
    })
  }
  else{
    let d = drink;
    d.name = req.body.name;
    d.price = req.body.price;
    d.type = req.body.type;
    drink.save();
    return res.status(200).json({
      message: "Drink updated"
    })
  }
})
})

router.route('/:id/delete').delete((req, res) => {
  const drinkId = req.params.id

Drink.findById(drinkId)
.then(drink => {
  drink.remove();
  res.json({message: 'drink deleted'})
})
.catch(err => console.log(err))

})
module.exports = router
