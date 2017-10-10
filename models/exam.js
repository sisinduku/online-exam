'use strict';
module.exports = (sequelize, DataTypes) => {
  var Exam = sequelize.define('Exam', {
    examName: DataTypes.STRING,
    jumlahSoal: DataTypes.INTEGER
  });
  return Exam;
};
