const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const cors           = require('cors');
const session        = require('express-session')
require("dotenv").config();

require('./db/db');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// SET UP CORS AS MIDDLEWARE, SO any client can make a request server
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());

const userRouter  = require('./src/routes/userRouter');
const productRouter  = require('./src/routes/productRouter');
const orderRouter  = require('./src/routes/orderRouter');

app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log('listening on port 3000');
});
