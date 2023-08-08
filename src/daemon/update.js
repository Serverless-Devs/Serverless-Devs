const { UpdateNotifier } = require('./lib');

(async () => {
  try {
    console.log('Starting update daemon...');

    // Exit process when offline
    setTimeout(process.exit, 1000 * 30);

    const updateNotifier = new UpdateNotifier();
    await updateNotifier.update();
    console.log('Update daemon finished successfully');
    // Call process exit explicitly to terminate the child process,
    // otherwise the child process will run forever, according to the Node.js docs
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

})()