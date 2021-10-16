/* eslint-disable @typescript-eslint/no-var-requires */
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
// Load User model
// const User = require('../models/user');
import User from '../models/user';
// import User from '../models/user';

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      User.findOne({
        email: email,
      }).then((user) => {
        if (!user) {
          console.log('NO MATCH');
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            console.log('MATCH');
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser(function (user, done) {
    console.log('serializeUser called');
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    console.log('deserializeUser called');
    User.findById(id, function (err, user) {
      console.log('user: ', user);
      done(err, user);
    });
  });
};
