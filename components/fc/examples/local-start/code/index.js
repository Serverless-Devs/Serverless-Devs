const getRawBody = require('raw-body');

module.exports.handler = function (request, response, context) {
  // get requset header
  const reqHeader = request.headers;
  let headerStr = ' ';
  for (const key in reqHeader) {
    headerStr += `${key }:${ reqHeader[key] }  `;
  }

  // get request info
  const { url } = request;
  const { path } = request;
  const { queries } = request;
  let queryStr = '';
  for (const param in queries) {
    queryStr += `${param }=${ queries[param] }  `;
  }
  const { method } = request;
  const { clientIP } = request;

  // get request body
  getRawBody(request, (err, data) => {
    const body = data;
    // you can deal with your own logic here

    // set response
    const respBody = new Buffer(`requestHeader:${ headerStr }\n` + `url: ${ url }\n` + `path: ${ path }\n` + `queries: ${ queryStr }\n` + `method: ${ method }\n` + `clientIP: ${ clientIP }\n` + `body: ${ body }\n`);
    response.setStatusCode(200);
    response.setHeader('content-type', 'application/json');
    response.send(respBody);
  });
};

