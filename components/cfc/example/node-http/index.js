let resp = {
  version: '2.0',
  response: {
    outputSpeech: {
      type: 'PlainText',
      text: '你好，世界！你好Serverless',
    },
    shouldEndSession: false,
  },
};
exports.handler = (event, context, callback) => {
  callback(null, resp);
};
