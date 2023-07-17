const passport = require('passport');

module.exports = (app) => {

  //googlestrategy has an internal identifier of 'google'
  //scope is an options object, it says what information we want acess to from the user
    //these terms are specifically named from google
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
      prompt: 'select_account'
     })
  );
    
  //in this callback, there will be a code added from google, and passport understands that
  //this is the second visit, and it will automatically take the code
  app.get(
    '/auth/google/callback', 
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  app.get('/api/logout', (req,res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};    