const md5 = require('md5-file');

module.exports.handler = function (_event, _context, callback) {
  console.log('md5: ', md5);
  callback(null, 'OK');
};

