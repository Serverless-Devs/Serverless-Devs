'use strict';

module.exports.handler = function (event, context, callback) {
  console.log(event);
  callback(null, `hello, event = ${event.toString()}`);
};