const express = require('express');
const router = express.Router();
const { createUser, listUsers } = require('../controllers/user');
const {isLoggedIn} = require('../middlewares/isLoggedIn');

router.post('/', async (req, res) => {
  const {firstName, lastName, ssn, address} = req.body;
  try {
    const user = await createUser({firstName, lastName, ssn, address});
    return res.status(200).send({
      status: 'ok',
      data: {userId: user._id}
    })
  } catch (err) {
    return res.status(500).send({
      message: 'Something went wrong'
    })
  }
});

router.get('/list', isLoggedIn, async (req, res) => {
  try {
    const users = await listUsers();
    return res.status(200).send({
      status: 'ok',
      data: users
    })
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      message: 'Something went wrong'
    })
  }
});

module.exports = router;
