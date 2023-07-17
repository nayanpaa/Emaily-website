//exporting a function, hence the lower case
//next a function what you call when all middleware is done, kinda like the done funciton
  //there may be many middlewares, hence the name next, when its done it goes to the next one
module.exports = (req, res, next) => {
  //the user is not logged in
  if (!req.user) {
    return res.status(401).send({ error: 'You must log in!'});
  }
  //the user is logged in
  next();
};