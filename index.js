//start with "node index.js"

//nodejs can't use the import stuff, instead we have to use the require stuff
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser'); //middleware
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
//since passport does not export anything, we don't need to assign this to a variable
require('./services/passport');
const authRoutes = require('./routes/authRoutes');
const billingRoutes = require('./routes/billingRoutes');
const surveyRoutes = require('./routes/surveyRoutes');


mongoose.connect(keys.mongoURI);
//set up configuration to listen to requests and send off to route handlers
const app = express();

//cookie expires in 30 days, which is done in milliseconds hence the equation
//keys is some random encryption key that we typed gibbirish idek
//these three use functions are middleware
  //intercept requests
//bodyParser allows us to use req.body and see the body of the request
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

//where we call the app to the routes files
authRoutes(app);
billingRoutes(app);
surveyRoutes(app);

//makes sure express behaves in the prod environment
if (process.env.NODE_ENV === 'production') {
  //if this isn't there it will do the next
  //Express will serve up production assets
  //like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  //catch all case
  //Express will serve up the index.html file
  //if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
//localhost:5000
//localhost:5000/auth/google

//app
  //express App to register this route handler with
//get
  //watch for incoming requests with this method
//'/'
  //watch for requests trying to access '/'
//req
  //object representing the incoming request
//res
  //Object representing the outgoing response
//res.send({hi: 'there})
  //Immediately send some JSON back to whoever made this request


