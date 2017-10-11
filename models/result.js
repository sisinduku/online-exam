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
  Result.associate = function(model) {
    Result.belongsTo(model.User, {
      foreignKey: 'userId',
      sourceKey: 'id',
    });
    Result.belongsTo(model.Exam, {
      foreignKey: 'examId',
      sourceKey: 'id'
    })
  }
  return Result;
};
