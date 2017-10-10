'use strict';
module.exports = (sequelize, DataTypes) => {
  var ExamQuestion = sequelize.define('ExamQuestion', {
    examId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ExamQuestion;
};