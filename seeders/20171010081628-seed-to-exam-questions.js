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
    return queryInterface.bulkInsert('ExamQuestions', [{
        examId: '1',
        questionId: '1',
      },{
        examId: '1',
        questionId: '2',
      },{
        examId: '1',
        questionId: '3',
      }, {
        examId: '2',
        questionId: '5',
      }, {
        examId: '4',
        questionId: '4',
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
