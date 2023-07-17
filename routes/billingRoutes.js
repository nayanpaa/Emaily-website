const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

//we need body parser to see inside the post request

//we send a reference to requireLogin, so express will do it itself internally
  //we do it specifically here because this is one of the few example where we specifically want it here to check is they are logged in
module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    //can use a stripe library that we install
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });

    //after we apply a charge
    //take the user model, add 5 credits, send user model back to client
      //req.user accesses the person (user model)
    req.user.credits += 5;
    //after we modify we need to save changes
    const user = await req.user.save();

    res.send(user);
  });
};