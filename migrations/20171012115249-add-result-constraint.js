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
        'Results', ['userId'], {
          type: 'FOREIGN KEY',
          name: 'results_userid_foreign',
          references: { //Required field
            table: 'Users',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        }
      )
      .then(() => {
        return queryInterface.addConstraint(
          'Results', ['examId'], {
            type: 'FOREIGN KEY',
            name: 'results_examid_foreign',
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
    return queryInterface.removeConstraint('Results',
        'results_userid_foreign')
      .then(() => {
        return queryInterface.removeConstraint('Results',
          'results_examid_foreign')
      })
  }
};
