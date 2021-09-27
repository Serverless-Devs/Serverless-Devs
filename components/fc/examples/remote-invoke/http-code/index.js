const getRawBody = require('raw-body');

module.exports.handler = function (request, response, context) {
  // get request body
  getRawBody(request, (err, data) => {
    const respBody = {
      abc: 123,
      a: '123',
    };
    response.setStatusCode(200);
    response.setHeader('content-type', 'application/json');
    response.send(JSON.stringify(respBody));
  });
};

