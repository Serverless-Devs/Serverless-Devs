/*
if you open the initializer feature, please implement the initializer function, as below:
module.exports.initializer = function(context, callback) {
  console.log('initializing');
  callback(null, '');
};
*/

module.exports.handler = function (event, context, callback) {
  console.log('hello world');
  callback(null, 'hello world');
};
