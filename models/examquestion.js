'use strict';
module.exports = (sequelize, DataTypes) => {
  var ExamQuestion = sequelize.define('ExamQuestion', {
    examId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER
  });
  ExamQuestion.associate = function(models){
    
  }
  return ExamQuestion;
};
