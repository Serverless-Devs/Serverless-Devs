/**
 * /*
 * To enable the initializer feature (https://help.aliyun.com/document_detail/156876.html)
 * please implement the initializer function as below：
 * exports.initializer = (context, callback) => {
 *   console.log('initializing');
 *   callback(null, '');
 * };
 *
 * @format
 */

exports.handler = (event, context, callback) => {
  console.log('hello world');
  callback(null, 'hello world');
};
