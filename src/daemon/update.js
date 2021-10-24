const UpdateNotifier = require('../update-notifier');

(async () => {
  const updateNotifier = new UpdateNotifier();
  await updateNotifier.update();
  process.exit();
})().catch(() => {
  process.exit(1);
});
