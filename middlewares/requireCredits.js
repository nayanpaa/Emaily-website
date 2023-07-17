module.exports = (req, res, next) => {
  //the user is not logged in
  if (req.user.credits < 1) {
    return res.status(403).send({ error: 'Not enough credits!'});
  }
  //the user is logged in
  next();
};