const request = require('request-promise');
const should = require('should');
const User = require('../models/user');
require('../server');

describe('Admin tests', () => {
  describe('/register', () => {
    it('registers a user', async () => {
      const response = await request({
        url: `http://localhost:8080/api/v1/admin/register`,
        body: {
          email: 'test@gmail.com',
          password: 'arbaz'
        },
        method: "POST",
        json: true
      });
      response.status.should.equal('ok')
    });
  });

  describe('/login', () => {
    it('login a registered user', async () => {
      await request({
        url: `http://localhost:8080/api/v1/admin/register`,
        body: {
          email: 'test@gmail.com',
          password: 'arbaz'
        },
        method: "POST",
        json: true
      });
      const res = await request({
        url: `http://localhost:8080/api/v1/admin/login`,
        body: {
          email: 'test@gmail.com',
          password: 'arbaz'
        },
        method: "POST",
        json: true
      });
      res.status.should.equal('ok')
    });
  });

  afterEach(async () => {
    await User.deleteMany({})
  });
});


