const _ = require('lodash');

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function randomStr () {
  return ('0'.repeat(8) + parseInt(Math.pow(2, 40) * Math.random()).toString(32)).slice(-8);
}

function upperFirst(inputs) {
  return _.transform(inputs, function(result, value, key) {
    if (_.isArray(value)) {
      const arr = [];
      for (const item of value) {
        arr.push(upperFirst(item));
      }
      result[_.upperFirst(key)] = arr;
    } else if (_.isObject(value)) {
      result[_.upperFirst(key)] = upperFirst(value);
    } else {
      result[_.upperFirst(key)] = value;
    }
  }, {});
}

module.exports = {
  sleep,
  randomStr,
  upperFirst,
}