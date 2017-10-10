'use strict';

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
    return queryInterface.bulkInsert('Questions', [{
        question: '1+1=',
        answer1: '2',
        answer2: '11',
        answer3: '100',
        answer4: '0',
      },{
        question: '1x1=',
        answer1: '1',
        answer2: '22',
        answer3: '100',
        answer4: '2',
      },{
        question: 'seratus adalah',
        answer1: '100',
        answer2: '1000',
        answer3: '10',
        answer4: '0',
      }, {
        question: 'Ibukota Indonesia',
        answer1: 'Jakarta',
        answer2: 'Papua',
        answer3: 'Kuala Lumpur',
        answer4: 'Ciliwung',
      }, {
        question: 'Pada hari minggu ku turut ... ke kota',
        answer1: 'ayah',
        answer2: 'teman',
        answer3: 'maling',
        answer4: 'bajindul',
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
