'use strict';
module.exports = (sequelize, DataTypes) => {
  var Question = sequelize.define('Question', {
    question: DataTypes.STRING,
    answer1: DataTypes.STRING,
    answer2: DataTypes.STRING,
    answer3: DataTypes.STRING,
    answer4: DataTypes.STRING
  });
  Question.associate = function(model) {
    Question.hasMany(model.ExamQuestion, {
      foreignKey: 'questionId',
      sourceKey: 'id',
    });
    Question.belongsToMany(model.Exam, {
      through: 'ExamQuestion',
      foreignKey: 'questionId',
      otherKey: 'examId',
    });
  }
  return Question;
};
