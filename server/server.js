const express = require('express');
const app = express(); 								// create our app w/ express
const mongoose = require('mongoose'); 					// mongoose for mongodb
const port = process.env.PORT || 8080; 				// set the port
const database = require('./config/database'); 			// load the database config
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const user = require('./routes/user');
const admin = require('./routes/admin');

app.use(cors({
  origin: ['http://127.0.0.1:3000','http://localhost:3000'],
  credentials: true
}));

mongoose.connect(database.url);
require('./config/passport')(passport);// connect to mongoDB database

app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request
app.use(cookieParser());

// required for passport
app.use(session({
  secret: 'starwarsspoiler',
  resave: false,
  saveUninitialized: true
})); // session secret

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use('/api/v1/user', user);
app.use('/api/v1/admin', admin);

app.use((err, req, res, next) => {
  res.status(err.code || 500).send({
    status: 'error',
    message: err.message || 'Something went wrong'
  });
});

app.listen(port);
console.log(`App listening on port ${port}`);
