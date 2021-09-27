module.exports.handler = function (event, context, callback) {
  console.log(event.toString());
  // console.dir(context);
  console.log('hello world');
  callback(null, 'hello world');
};

module.exports.preFreeze = function (event, context, callback) {
  console.log('hello preFreeze');
  callback(null, 'hello preFreeze');
};

module.exports.preStop = function (event, context, callback) {
  console.log('hello preStop');
  callback(null, 'hello preStop');
};
