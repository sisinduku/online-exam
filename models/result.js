'use strict';
module.exports = (sequelize, DataTypes) => {
  var Result = sequelize.define('Result', {
    userId: DataTypes.INTEGER,
    examId: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Result;
};