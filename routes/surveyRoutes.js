const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url'); //you get it with node
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys/:surveyId/:choice', (req,res) => {
    res.send('Thanks for voting!');
  });

  app.get('/api/surveys', requireLogin, async (req, res) => {
    //make sure they're authenticated with require login
    //reach into surveys in mongodb, and get the user's surveys
      //ask mongoose to fetch all surveys where survey._userid with the same user
      //access user using req.user
    //we don't also want to get the entire survey object, cuz we don't want to get the huge list of recipients and stuff
      //we need to find a way to only get the information we need

    //we use the mongoose query helper, select, to control our projections of what we want to get, 
    //so we specify that we don't want the recipients
    const surveys = await Survey.find({_user: req.user.id})
      .select({ recipients: false });
    res.send(surveys);
  }); 

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice'); 
    //maps through the objects in the sendgrid info sent back
    _.chain(req.body)
      .map(({email, url}) => {
        //using the hlper function we can extract the path from the url
        //this creates an object with the traits that have a colon before
        //if any of these traits are missing p returns as null
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice};
        }
      })
    //compact removes any elements that are undefined
      .compact()
      .uniqBy('email', 'surveyId')
    //don't need to make this async because sengrid doesn't want a respponse.
      .each(({surveyId, email, choice}) => {
        Survey.updateOne(	
          {	
            _id: surveyId,	
            recipients: {	
              $elemMatch: { email: email, responded: false },	
            },	
          },	
          {	
            $inc: { [choice]: 1 },	
            $set: { 'recipients.$.responded': true },	
            lastResponded: new Date()
          }	
        ).exec();
      })
      .value();

  

    res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req,res) => {
    //are they logged in (can use the middlewares) 
      //a reference of this is added in the parameters (requireLogin)
    //if you are logged in, do you have enough credits
      //a reference is added, notice the order of the middleware

    //NOTE: we are assuming that we are recieving some post request from the front end
    //take the incoming request, which has all the information inside it(title, subject, etc)
    //then we will make a survey model with this info
    //this info is in req.body
    const { title, subject, body, recipients } = req.body;
    
    //make a new  instance of a survey
    //title aka title: title, but they're the same hence 'title'
    //recipients
      //taking in: email@email.com, email@email.com, email@email.com
      //we need to transform the array of strings to an array of objects
      //this was recipients.split(',').map(email=> {return {email: email}})
        //but it was refactored into a shorter form
        //this expression basically now returns an array objects, with a property of email and an actual email
    //we don't have to deal with the survey properties with a default value
    const survey = new Survey({ 
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email=> ({email: email.trim()})),
      _user: req.user.id,
      dateSent: Date.now()
    });

    try {
      //Great place to send an email!
      const mailer = new Mailer(survey, surveyTemplate(survey));
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      //old user is stale now
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};

/*
we don't want to bring this back to the express world, lets just get it done int the data base all in one clean sweep
vid 204 && 205, find an update, find recipient with correct parameters, increment yes/no choice, and make specific recipient responded true


Survey.updateOne({
  id: surveyID,
  recipients: {
    $elemMatch: { email: email, responded}
  }
}, {
  $inc: { [choice]: 1 }, 
  $set: { 'recipients.$.responded': true }
})

*/