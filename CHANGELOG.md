# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v3.1.0] - 2024-07-15
### :sparkles: New Features
- [`384220c`](https://github.com/Serverless-Devs/Serverless-Devs/commit/384220ca9c5b9c30f93b968207eb4ce179e4cbab) - support `resources.xx.info.xx` *(commit by [@zxypro1](https://github.com/zxypro1))*
- [`910f97e`](https://github.com/Serverless-Devs/Serverless-Devs/commit/910f97e602668ad23b451885a050e2524c5baf53) - add __component info to output *(commit by [@zxypro1](https://github.com/zxypro1))*
- [`76c2ab5`](https://github.com/Serverless-Devs/Serverless-Devs/commit/76c2ab5f4459ac221dc53bf0243b74f434bb990a) - support ${components.xx.output} *(commit by [@zxypro1](https://github.com/zxypro1))*

### :bug: Bug Fixes
- [`ecbcbf1`](https://github.com/Serverless-Devs/Serverless-Devs/commit/ecbcbf1a640c50dcb04ad47e1ec971253cf7ecb9) - fail to get info using `s [resourceName] [command]` *(commit by [@zxypro1](https://github.com/zxypro1))*


## [v3.0.10] - 2024-06-17
### :sparkles: New Features
- [`322394c`](https://github.com/Serverless-Devs/Serverless-Devs/commit/322394c34d006a22f49f18f095a0ae588db863e4) - volcengine support *(commit by [@zxypro1](https://github.com/zxypro1))*
- [`cd3206f`](https://github.com/Serverless-Devs/Serverless-Devs/commit/cd3206f7761d1fd51e06b4e88b0fd926a6067588) - add root warning *(commit by [@zxypro1](https://github.com/zxypro1))*


## [v3.0.9] - 2024-06-04
### :sparkles: New Features
- [`36b45d8`](https://github.com/Serverless-Devs/Serverless-Devs/commit/36b45d8d6adf8add31f87b0c6d435065746893ed) - add `--private` for `s registry list` command to show private packages *(commit by [@zxypro1](https://github.com/zxypro1))*

### :bug: Bug Fixes
- [`9d0fb6f`](https://github.com/Serverless-Devs/Serverless-Devs/commit/9d0fb6fd98e4aed436e15aea6ccc357f833f553e) - help info *(commit by [@zxypro1](https://github.com/zxypro1))*
- [`8a52b3e`](https://github.com/Serverless-Devs/Serverless-Devs/commit/8a52b3e8859ff3759a96864b86d8304148e636cf) - env command only run with 3.x version yaml *(commit by [@zxypro1](https://github.com/zxypro1))*


## [v3.0.8] - 2024-05-09
### :boom: BREAKING CHANGES
- due to [`38392d8`](https://github.com/Serverless-Devs/Serverless-Devs/commit/38392d8e961889213b361fadda60fbab182fbd1f) - only use env component after being manually set *(PR [#820](https://github.com/Serverless-Devs/Serverless-Devs/pull/820) by [@zxypro1](https://github.com/zxypro1))*:

  only use env component after being manually set (#820)


### :sparkles: New Features
- [`38392d8`](https://github.com/Serverless-Devs/Serverless-Devs/commit/38392d8e961889213b361fadda60fbab182fbd1f) - only use env component after being manually set *(PR [#820](https://github.com/Serverless-Devs/Serverless-Devs/pull/820) by [@zxypro1](https://github.com/zxypro1))*

### :bug: Bug Fixes
- [`b6b8494`](https://github.com/Serverless-Devs/Serverless-Devs/commit/b6b8494dc45b1038c132b3b9c2a2922add47c206) - flow stuck when flow projects > 1 and diff *(PR [#821](https://github.com/Serverless-Devs/Serverless-Devs/pull/821) by [@zxypro1](https://github.com/zxypro1))*


## [v3.0.7] - 2024-04-11
### :sparkles: New Features
- [`1238897`](https://github.com/Serverless-Devs/Serverless-Devs/commit/1238897ffea71ef540d542b3ea0df73fabaa9021) - support custom registry *(commit by [@zxypro1](https://github.com/zxypro1))*
- [`b802381`](https://github.com/Serverless-Devs/Serverless-Devs/commit/b802381f7ca5acd1758338743c2d190a746121e6) - support no input parameters *(PR [#818](https://github.com/Serverless-Devs/Serverless-Devs/pull/818) by [@zxypro1](https://github.com/zxypro1))*

### :bug: Bug Fixes
- [`25fa1c5`](https://github.com/Serverless-Devs/Serverless-Devs/commit/25fa1c523c705532de00c07a164bda824963b435) - registry provider support huoshan *(commit by [@zxypro1](https://github.com/zxypro1))*
- [`c1a3cba`](https://github.com/Serverless-Devs/Serverless-Devs/commit/c1a3cba3d8ed86f3ccd2c680b948b8721f17b75c) - github registry default load from devsapp *(PR [#813](https://github.com/Serverless-Devs/Serverless-Devs/pull/813) by [@zxypro1](https://github.com/zxypro1))*
- [`578af2f`](https://github.com/Serverless-Devs/Serverless-Devs/commit/578af2fcad5073e90bbbbce03cfaaf3066101876) - action `fc3 invoke` timeout *(PR [#815](https://github.com/Serverless-Devs/Serverless-Devs/pull/815) by [@zxypro1](https://github.com/zxypro1))*
- [`9987d34`](https://github.com/Serverless-Devs/Serverless-Devs/commit/9987d3438dee31cb29b7c15d3361c19983f8e379) - component action command not found *(PR [#816](https://github.com/Serverless-Devs/Serverless-Devs/pull/816) by [@zxypro1](https://github.com/zxypro1))*


## [v3.0.6] - 2024-03-29
### :bug: Bug Fixes
- [`94e67dc`](https://github.com/Serverless-Devs/Serverless-Devs/commit/94e67dc6eac0cca8861bc8ff8df5c551db017136) - remove dingtalk *(commit by [@zxypro1](https://github.com/zxypro1))*
- [`016f3e6`](https://github.com/Serverless-Devs/Serverless-Devs/commit/016f3e6b88e1ac23d4c7d3fa375a860f8ff390cd) - command not found when load dev component *(commit by [@zxypro1](https://github.com/zxypro1))*


[v3.0.6]: https://github.com/Serverless-Devs/Serverless-Devs/compare/v3.0.5...v3.0.6
[v3.0.7]: https://github.com/Serverless-Devs/Serverless-Devs/compare/v3.0.6...v3.0.7
[v3.0.8]: https://github.com/Serverless-Devs/Serverless-Devs/compare/v3.0.7...v3.0.8
[v3.0.9]: https://github.com/Serverless-Devs/Serverless-Devs/compare/v3.0.8...v3.0.9
[v3.0.10]: https://github.com/Serverless-Devs/Serverless-Devs/compare/v3.0.9...v3.0.10
[v3.1.0]: https://github.com/Serverless-Devs/Serverless-Devs/compare/v3.0.10...v3.1.0
