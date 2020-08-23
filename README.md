# Pomodorro

This is a Pomodorro timer Application project.

## What is the goal?

This application is made for better productivity in your everyday coding/programming/computer life. It uses the Pomodorro 🍅 technique: **work hard for 20 minutes and then have a 5 minute rest. Then repeat.** Currently it supports next features:

- running timer(default work time: 20 minutes, rest time: 5 minutes)
- Creating an account with username
- Creating tasks _(once you have an account)_
- Deleting tasks _(once you have an account)_
- Changing default times _(once you have an account)_
- Changing username _(once you have an account)_
- Deleting progress _(once you have an account)_
- Deleting all tasks at once _(once you have an account)_
- Deleting account _(once you have an account)_
- Using custom times for tasks(setting times for tasks is not supported yet)

The application is fully responsive: you can use it both on mobile and on tablet or PC.

### Used tecknologies:

- React
- Redux
- Material UI
- Node.js
- JWT
- MongoDB Atlas
- Deployed on Heroku

### Current issues are:

- authentication is made with 1 token, so it does not auto refresh and throws errors.
  - Temporary solution: clear localStorage when you get an error.
- no sound is provided in timer
- The tasks page is a little bit ugly
- No reCaptcha is made on registration or login page

Feel free to create issues and notify me about new problems.

The application is available [here](https://evening-mesa-44346.herokuapp.com/) (be patient, Heroku may load it very late)
