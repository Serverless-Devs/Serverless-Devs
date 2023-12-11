## 🚀 Features
- Add early versions of the `verify` command. [#712](https://github.com/orgs/Serverless-Devs/discussions/712)

## 🛠️ Bug Fixes
- Env component don't run even when a default env is set.
- `s config get` print nothing when no account is configured.
- `${env}` not found when `.env` file in `./code` dir.
- No report data when deploy on aliyun fc website.
- `s config delete` requires access parameter. [#714](https://github.com/Serverless-Devs/Serverless-Devs/issues/714)
- Request headers are being displayed when downloading components.

## 💻 Maintenance
- Add more help information to `env` command.
- Improve `env` documentation.
- Add an new parameter to `env init` command.