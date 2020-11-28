const request = require('request-promise').defaults({ jar: true });
const should = require('should');
const User = require('../models/user');
require('../server');

describe('user tests', () => {
  describe('/', () => {
    it('adds a user entry', async () => {
      const response = await request({
        url: `http://localhost:8080/api/v1/user`,
        body: {
          firstName: 'arbaz',
          lastName: 'siddiqui',
          ssn: '111-111-111',
          address: 'test address'
        },
        method: "POST",
        json: true
      });
      response.status.should.equal('ok')
    });
  });

  describe('/list', () => {
    it('list all users', async () => {
      // add a user entry
      await request({
        url: `http://localhost:8080/api/v1/user`,
        body: {
          firstName: 'arbaz',
          lastName: 'siddiqui',
          ssn: '111-111-111',
          address: 'test address'
        },
        method: "POST",
        json: true
      });
      // create and authenticate user
      await request({
        url: `http://localhost:8080/api/v1/admin/register`,
        body: {
          email: 'test@gmail.com',
          password: 'arbaz'
        },
        method: "POST",
        json: true
      });
      await request({
        url: `http://localhost:8080/api/v1/admin/login`,
        body: {
          email: 'test@gmail.com',
          password: 'arbaz'
        },
        method: "POST",
        json: true
      });

      const res = await request({
        url: `http://localhost:8080/api/v1/user/list`,
        method: "GET",
        json: true
      });
      res.data[0].firstName.should.equal('arbaz');
      res.data[0].lastName.should.equal('siddiqui');
      res.data[0].ssn.should.equal('111-111-111');
      res.data[0].address.should.equal('test address');
    });
  });
});

afterEach(async () => {
  await User.deleteMany({})
});

