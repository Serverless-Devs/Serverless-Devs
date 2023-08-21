const { Report } = require('./lib');

(async () => {
    try {
        console.log('********Starting report in daemon********');

        // Exit process when offline
        setTimeout(process.exit, 1000 * 30);
        const { type, template, uid, argv } = JSON.parse(process.argv[2]);
        console.log('type', type);
        console.log('template', template);
        console.log('uid', uid);
        console.log('argv', argv);
        const instance = new Report();
        type === 'init' ? await instance.reportInit({ template }) : await instance.reportCommand({ uid, argv });
        console.log('********report successfully in daemon********');
        // Call process exit explicitly to terminate the child process,
        // otherwise the child process will run forever, according to the Node.js docs
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();
