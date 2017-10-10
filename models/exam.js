'use strict';
module.exports = (sequelize, DataTypes) => {
  var Exam = sequelize.define('Exam', {
    examName: DataTypes.STRING,
    jumlahSoal: DataTypes.INTEGER
  });
  Exam.associate = function(model) {
    Exam.hasMany(model.ExamQuestion, {
      foreignKey: 'examId',
      sourceKey: 'id',
    })
  }
  return Exam;
};
