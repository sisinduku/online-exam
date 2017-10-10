'use strict';
const encryptAES256CTR = require('../helpers/encryptAES256CTR');
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Users', [{
      'username': 'admin',
      'password': encryptAES256CTR('admin'),
      'fullname': 'Administrator',
      'role': 'admin',
    }, {
      'username': 'user1',
      'password': encryptAES256CTR('user1'),
      'fullname': 'User 1',
      'role': 'user',
    }, {
      'username': 'user2',
      'password': encryptAES256CTR('user2'),
      'fullname': 'User 2',
      'role': 'user',
    }, {
      'username': 'user3',
      'password': encryptAES256CTR('user3'),
      'fullname': 'User 3',
      'role': 'user',
    }])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
