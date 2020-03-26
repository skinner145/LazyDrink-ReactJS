const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');


const drinkRoutes = require('./routes/drink');
const typeRoutes = require('./routes/type');
const orderRoutes = require('./routes/order');
const authRoutes = require('./routes/auth');

const port = 4000;

require('dotenv').config();
const uri = process.env.ATLAS_URI;
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true
});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('mongodb database connection established successfully');
});


app.use('/drinks', drinkRoutes);
app.use('/types', typeRoutes);
app.use('/orders', orderRoutes);
app.use('/pub', authRoutes)

app.listen(port, function(){
  console.log('Server running on port: ' + port);
})
