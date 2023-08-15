const { Component } = require('./lib');

(async () => {
  try {
    console.log('********Starting update component in daemon********');

    // Exit process when offline
    setTimeout(process.exit, 1000 * 30);
    const { component } = JSON.parse(process.argv[2]);
    console.log('component', component);
    const instance = new Component(component);
    await instance.update();
    console.log('********Update component successfully in daemon********');
    // Call process exit explicitly to terminate the child process,
    // otherwise the child process will run forever, according to the Node.js docs
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
