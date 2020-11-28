const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');

module.exports = function (passport) {

  // passport session setup
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });

  // LOCAL SIGNUP
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, email, password, done) => {
    try {
      const user = await User.findOne({email});
      if (user) {
        return done({code: 400, message: 'User already exists'}, false);
      }
      const {firstName, lastName} = req.body;
      const newUser = new User({
        email,
        isAdmin: true,
        firstName,
        lastName,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
      });
      await newUser.save();
      return done(null, newUser);
    } catch (err) {
      return done(err);
    }
  }));

  // LOCAL LOGIN
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, email, password, done) => {
    try {
      const user = await User.findOne({email});
      if (!user) {
        return done({code: 400, message: 'User does not exists'}, false);
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return done({code: 403, message: 'Incorrect password'}, false);
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));
};

