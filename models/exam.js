'use strict';
module.exports = (sequelize, DataTypes) => {
  var Exam = sequelize.define('Exam', {
    examName: DataTypes.STRING,
    jumlahSoal: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Exam;
};