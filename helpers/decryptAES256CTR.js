module.exports = function(crypted) {
  var crypto = require('crypto');
  var decipher = crypto.createDecipher('aes-256-ctr', '453LoL3J0oS5')
  var dec = decipher.update(crypted, 'hex', 'utf8')
  dec += decipher.final('utf8');
  return dec;
};
