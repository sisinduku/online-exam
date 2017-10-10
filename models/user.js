'use strict';
const encryptAES256CTR = require('../helpers/encryptAES256CTR');
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    fullname: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user, option) => {
        user.password = encryptAES256CTR(user.password)
      },
      beforeUpdate: (user, option) => {
        user.password = encryptAES256CTR(user.password)
      }
    }
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};
