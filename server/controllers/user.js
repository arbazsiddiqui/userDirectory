const User = require('../models/user');
const {encrypt, decrypt} = require('../lib/utils');

const createUser = ({firstName, lastName, ssn, address}) => {
  const newUser = new User({
    isAdmin: false,
    firstName,
    lastName,
    ssn: encrypt(ssn),
    address
  });
  return newUser.save();
};

const listUsers = async () => {
  const users = await User.find({
    isAdmin: false
  });
  return users.map((user) => ({...user.toObject(), ssn: decrypt(user.ssn)}))
};

module.exports = {
  createUser,
  listUsers
};
