'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.addConstraint(
        'ExamQuestions', ['questionId'], {
          type: 'FOREIGN KEY',
          name: 'examquestions_questionid_foreign',
          references: { //Required field
            table: 'Questions',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        }
      )
      .then(() => {
        return queryInterface.addConstraint(
          'ExamQuestions', ['examId'], {
            type: 'FOREIGN KEY',
            name: 'examquestions_examid_foreign',
            references: { //Required field
              table: 'Exams',
              field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
          }
        )
      });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.removeConstraint('ExamQuestions',
        'examquestions_questionid_foreign')
      .then(() => {
        return queryInterface.removeConstraint('ExamQuestions',
          'examquestions_examid_foreign')
      })
  }
};
