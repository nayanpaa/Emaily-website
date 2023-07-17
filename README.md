# Emaily-website
https://boiling-dusk-01323-daa95854a71e.herokuapp.com/

### Client
  ## src
      Actions
      - made http requests with the express side of the app
      - used redux to make dispatches to the frontend

      Components
      - responsible for all frontend components and navigation
      - Payments utilized Stripe Api
      - Surveys housed all of surveys frontend using ReduxForm

### Server
  ## config
      redirects keys based off of prod or dev

  ## middlewares
      checks whether user is logged in or has enough credits

  ## models
    - responsible for MongoDB collections and sub collections
    - MongoDB has collection of users and surveys (with subcollection of recipients with in surveys)
      - surveys is not a subcollection of users, however each survey has a user._id property

  ## routes
    - responsible for http requests to frontend and APIs
    - authRoutes uses passport to make requests to Google OAuth
    - surveyRoutes uses mongoose to make requests to MongoDB
    - billingRoues makes requests to Stripe API

  ## index  
    - mostly set up, and configures cookie session
      
