const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  address: {
    type: String
  },
  phone: {
    type: String
  },
  ssn: {
    type: String
  },
  isAdmin: {
    type: Boolean,
    required: true
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  }
});

module.exports = mongoose.model('User', userSchema);
