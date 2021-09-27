module.exports.initializer = function (event, context, callback) {
  callback(null, ['initializer']);
};

module.exports.handler = function (event, context, callback) {
  callback(null, ['OK']);
};

