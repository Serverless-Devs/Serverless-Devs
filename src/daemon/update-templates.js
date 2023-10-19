const { Templates } = require('./lib');

(async () => {
  try {
    console.log('******** Starting update templates in daemon ********');
    // Exit process when offline
    setTimeout(process.exit, 1000 * 30);

    const instance = new Templates();
    await instance.update();
    console.log('******** Update templates successfully in daemon ********');
    // Call process exit explicitly to terminate the child process,
    // otherwise the child process will run forever, according to the Node.js docs
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
