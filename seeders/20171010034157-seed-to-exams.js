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
    return queryInterface.bulkInsert('Exams', [{
        examName: 'Ujian MatematikaKu',
        jumlahSoal: '2',
      },{
        examName: 'Ujian KesenianKu',
        jumlahSoal: '5',
      },{
        examName: 'Ujian BahasaKu',
        jumlahSoal: '3',
      }, {
        examName: 'Ujian SuperKu',
        jumlahSoal: '1',
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
