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

const userRouter  = require('./routes/userRouter');
const itemRouter  = require('./routes/itemRouter');

app.use('/user', userRouter);
app.use('/item', itemRouter);

app.listen(process.env.PORT || 6000, () => {
  console.log('listening on port 6000');
});
