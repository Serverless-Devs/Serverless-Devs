const { Report } = require('./lib');

(async () => {
  try {
    console.log('********Starting report in daemon********');

    // Exit process when offline
    setTimeout(process.exit, 1000 * 30);
    const { type, template, uid, argv, command, component, message, userAgent } = JSON.parse(process.argv[2]);
    console.log('type', type);
    const instance = new Report();
    const run = async () => {
      if (type === 'init') {
        console.log('template', template);
        return await instance.reportInit({ template });
      }
      console.log('userAgent', userAgent);
      console.log('command', command);
      if (type === 'command') {
        console.log('uid', uid);
        console.log('argv', argv);
        console.log('component', component);
        return await instance.reportCommand({ uid, argv, command, component, userAgent });
      }
      // 解析异常
      if (type === 'parseException') {
        console.log('uid', uid);
        console.log('argv', argv);
        console.log('message', message);
        return await instance.reportParseException({ argv, command, message, userAgent });
      }
      // 执行异常
      if (type === 'runtimeException') {
        console.log('uid', uid);
        console.log('argv', argv);
        console.log('component', component);
        console.log('message', message);
        return await instance.reportRuntimeException({ uid, argv, command, component, message, userAgent });
      }
    };
    await run();
    console.log('********report successfully in daemon********');
    // Call process exit explicitly to terminate the child process,
    // otherwise the child process will run forever, according to the Node.js docs
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
