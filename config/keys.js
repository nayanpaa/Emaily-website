//keys.js
//doesn't contain actual keys, just the logic for what credentials to return

//heroku sets this to production if it is in the heroku thing
if (process.env.NODE_ENV === 'production') {
  //prod

  module.exports = require('./prod');
} else {
  //dev
  module.exports = require('./dev');
}

