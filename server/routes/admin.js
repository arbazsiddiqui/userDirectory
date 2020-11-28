const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/register', async (req, res) => {
  return passport.authenticate('local-signup', (err, user) => {
    try {
      if (err) {
        throw err
      }
      return res.status(200).send({
        status: 'ok',
        data: {userId: user._id}
      })
    } catch (err) {
      console.log({err});
      return res.status(err.code || 500).send({
        message: err.message || 'Something went wrong'
      })
    }
  })(req, res);
});

router.post('/login', async (req, res) => {
  return passport.authenticate('local-login', (err, user) => {
    try {
      if (err) {
        throw err
      }
      req.login(user, (err) => {
        return res.status(200).send({
          status: 'ok',
          data: {userId: user._id}
        })
      });
    } catch (err) {
      console.log({err});
      return res.status(err.code || 500).send({
        message: err.message || 'Something went wrong'
      })
    }
  })(req, res);
});

module.exports = router;
