module.exports.handler = function (event, _context, callback) {
  console.log(event.toString());
  console.log('hello world');
  callback(null, 'hello world');
};
