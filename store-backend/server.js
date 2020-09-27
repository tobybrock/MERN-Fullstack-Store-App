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

// SET UP CORS AS MIDDLEWARE, SO any client can make a request to our server
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// CORS allows requests to come in from React
app.use(cors());

// Require the controller after the middleware

const userRouter  = require('./routes/userRouter');


app.use('/user', userRouter);

app.listen(process.env.PORT || 6000, () => {
  console.log('listening on port 6000');
});
