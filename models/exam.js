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
    });
    Exam.hasMany(model.Result, {
      foreignKey: 'examId',
      foreignKey: 'id',
    });
    Exam.belongsToMany(model.User, {
      through: 'Result',
      foreignKey: 'examId',
      otherKey: 'userId',
    });
    Exam.belongsToMany(model.Question, {
      through: 'ExamQuestion',
      foreignKey: 'examId',
      otherKey: 'questionId',
    })
  }
  return Exam;
};
