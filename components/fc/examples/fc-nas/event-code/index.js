module.exports.handler = function (event, context, callback) {
  console.log('======hello world start======');
  console.log(event.toString());
  console.log('======hello world end======');
  callback(null, 'hello world');
};
