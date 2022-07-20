#!/bin/bash
esbuild lib/index.js --bundle --log-level=error --minify --external:@serverless-devs/core --external:@serverless-devs/ui --platform=node --format=cjs --target=node10.4 --allow-overwrite --outfile=lib/index.js
esbuild lib/init/index.js --bundle --log-level=error --minify --external:@serverless-devs/core --external:@serverless-devs/ui --platform=node --format=cjs --target=node10.4 --allow-overwrite --outfile=lib/init/index.js
esbuild lib/cli/index.js --bundle --log-level=error --minify --external:@serverless-devs/core --external:@serverless-devs/ui --platform=node --format=cjs --target=node10.4 --allow-overwrite --outfile=lib/cli/index.js
esbuild lib/config/index.js --bundle --log-level=error --minify --external:@serverless-devs/core --external:@serverless-devs/ui --platform=node --format=cjs --target=node10.4 --allow-overwrite --outfile=lib/config/index.js
esbuild lib/config/add/index.js --bundle --log-level=error --minify --external:@serverless-devs/core --external:@serverless-devs/ui --platform=node --format=cjs --target=node10.4 --allow-overwrite --outfile=lib/config/add/index.js
esbuild lib/config/delete/index.js --bundle --log-level=error --minify --external:@serverless-devs/core --external:@serverless-devs/ui --platform=node --format=cjs --target=node10.4 --allow-overwrite --outfile=lib/config/delete/index.js
esbuild lib/config/get/index.js --bundle --log-level=error --minify --external:@serverless-devs/core --external:@serverless-devs/ui --platform=node --format=cjs --target=node10.4 --allow-overwrite --outfile=lib/config/get/index.js
esbuild lib/config/rename/index.js --bundle --log-level=error --minify --external:@serverless-devs/core --external:@serverless-devs/ui --platform=node --format=cjs --target=node10.4 --allow-overwrite --outfile=lib/config/rename/index.js
esbuild lib/set/index.js --bundle --log-level=error --minify --external:@serverless-devs/core --external:@serverless-devs/ui --platform=node --format=cjs --target=node10.4 --allow-overwrite --outfile=lib/set/index.js
esbuild lib/set/registry/index.js --bundle --log-level=error --minify --external:@serverless-devs/core --external:@serverless-devs/ui --platform=node --format=cjs --target=node10.4 --allow-overwrite --outfile=lib/set/registry/index.js
esbuild lib/set/locale/index.js --bundle --log-level=error --minify --external:@serverless-devs/core --external:@serverless-devs/ui --platform=node --format=cjs --target=node10.4 --allow-overwrite --outfile=lib/set/locale/index.js
esbuild lib/set/analysis/index.js --bundle --log-level=error --minify --external:@serverless-devs/core --external:@serverless-devs/ui --platform=node --format=cjs --target=node10.4 --allow-overwrite --outfile=lib/set/analysis/index.js
esbuild lib/set/workspace/index.js --bundle --log-level=error --minify --external:@serverless-devs/core --external:@serverless-devs/ui --platform=node --format=cjs --target=node10.4 --allow-overwrite --outfile=lib/set/workspace/index.js
esbuild lib/clean/index.js --bundle --log-level=error --minify --external:@serverless-devs/core --external:@serverless-devs/ui --platform=node --format=cjs --target=node10.4 --allow-overwrite --outfile=lib/clean/index.js
esbuild lib/component/index.js --bundle --log-level=error --minify --external:@serverless-devs/core --external:@serverless-devs/ui --platform=node --format=cjs --target=node10.4 --allow-overwrite --outfile=lib/component/index.js
esbuild lib/update-notifier/index.js --bundle --log-level=error --minify --external:@serverless-devs/core --external:@serverless-devs/ui --platform=node --format=cjs --target=node10.4 --allow-overwrite --outfile=lib/update-notifier/index.js
esbuild lib/verify/index.js --bundle --log-level=error --minify --external:@serverless-devs/core --external:@serverless-devs/ui --platform=node --format=cjs --target=node10.4 --allow-overwrite --outfile=lib/verify/index.js
esbuild lib/edit/index.js --bundle --log-level=error --minify --external:@serverless-devs/core --external:@serverless-devs/ui --platform=node --format=cjs --target=node10.4 --allow-overwrite --outfile=lib/edit/index.js


