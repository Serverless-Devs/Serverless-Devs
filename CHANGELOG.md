# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v3.1.10] - 2025-05-13
### :sparkles: New Features
- [`644f5d6`](https://github.com/Serverless-Devs/Serverless-Devs/commit/644f5d6ed9e9ec558894b5a6019338920ecb706a) - add 'replace_output' props to plugin, allowing plugins to modify resource's output. *(commit by [@zxypro1](https://github.com/zxypro1))*

### :bug: Bug Fixes
- [`36e17be`](https://github.com/Serverless-Devs/Serverless-Devs/commit/36e17be30914e668a697df100571c87945a6faea) - cli dont support --output-format *(commit by [@zxypro1](https://github.com/zxypro1))*

### :wrench: Chores
- [`3618f15`](https://github.com/Serverless-Devs/Serverless-Devs/commit/3618f15c2e67d824758c32771e28849b88553983) - update vefaas description *(commit by [@songhn233](https://github.com/songhn233))*


## [v3.1.9] - 2025-03-28
### :bug: Bug Fixes
- [`ddc8369`](https://github.com/Serverless-Devs/Serverless-Devs/commit/ddc836926a760c3b1f612832665984b1dcbc08dc) - registry login failure *(commit by [@zxypro1](https://github.com/zxypro1))*


## [v3.1.7] - 2025-03-21
### :sparkles: New Features
- [`1562c13`](https://github.com/Serverless-Devs/Serverless-Devs/commit/1562c1345aa90e1dd33ba86edcb2b384d7720bf8) - -f bypass size limit *(commit by [@zxypro1](https://github.com/zxypro1))*
- [`0bdb74c`](https://github.com/Serverless-Devs/Serverless-Devs/commit/0bdb74c6808114f25298ca742960f010a3223370) - add -f to publish *(commit by [@zxypro1](https://github.com/zxypro1))*
- [`d8408f2`](https://github.com/Serverless-Devs/Serverless-Devs/commit/d8408f2dffb17ddc08586274d07e86d52569c2bc) - two region support *(commit by [@zxypro1](https://github.com/zxypro1))*
- [`85f4ff1`](https://github.com/Serverless-Devs/Serverless-Devs/commit/85f4ff1f2f8e3d658465774b1f1460a14e4fbd03) - support render .stpl files *(commit by [@zxypro1](https://github.com/zxypro1))*

### :bug: Bug Fixes
- [`59479a5`](https://github.com/Serverless-Devs/Serverless-Devs/commit/59479a5a3fc277bc62baa79fb43d487db49e2077) - registry add more error info *(commit by [@zxypro1](https://github.com/zxypro1))*


## [v3.1.6] - 2025-02-11
### :sparkles: New Features
- [`58d8b01`](https://github.com/Serverless-Devs/Serverless-Devs/commit/58d8b0187a4e7f12c1c162143d666a43aa54a294) - s set registry clean *(commit by [@zxypro1](https://github.com/zxypro1))*

### :bug: Bug Fixes
- [`d352c8c`](https://github.com/Serverless-Devs/Serverless-Devs/commit/d352c8c78d8bce76ac28a8760312af0b733588b4) - incorrect category for registry *(commit by [@zxypro1](https://github.com/zxypro1))*
- [`f3c6e83`](https://github.com/Serverless-Devs/Serverless-Devs/commit/f3c6e839acbd28e10a7c1d6fe413894a94376184) - set registry not working *(commit by [@zxypro1](https://github.com/zxypro1))*
- [`2a59963`](https://github.com/Serverless-Devs/Serverless-Devs/commit/2a5996370143c943e56a4ceb42269d48eb82e883) - set registry *(commit by [@zxypro1](https://github.com/zxypro1))*
- [`0f9cf01`](https://github.com/Serverless-Devs/Serverless-Devs/commit/0f9cf01a6ea83ff26a9e75f8a7268c71f6d391c3) - hang in node20+ *(commit by [@zxypro1](https://github.com/zxypro1))*
- [`5a084b1`](https://github.com/Serverless-Devs/Serverless-Devs/commit/5a084b161a05d92b2edfbdddb6d03f9ec575c8fe) - publish err in linux *(commit by [@zxypro1](https://github.com/zxypro1))*
- [`aa102da`](https://github.com/Serverless-Devs/Serverless-Devs/commit/aa102dacde57c61bb46f127bf477ca12ba628c61) - linux ext *(commit by [@zxypro1](https://github.com/zxypro1))*
- [`c9ef21c`](https://github.com/Serverless-Devs/Serverless-Devs/commit/c9ef21c0ac4a705d7ce8018c71c824c6fad02b28) - hanging in node20 *(commit by [@zxypro1](https://github.com/zxypro1))*


## [v3.1.5] - 2024-12-27
### :bug: Bug Fixes
- [`d44fa7c`](https://github.com/Serverless-Devs/Serverless-Devs/commit/d44fa7c293283223f26ff59a040f2facf3b54b70) - can't publish package without s.yaml *(commit by [@zxypro1](https://github.com/zxypro1))*


## [v3.1.4] - 2024-12-27
### :boom: BREAKING CHANGES
- due to [`3e6cdbe`](https://github.com/Serverless-Devs/Serverless-Devs/commit/3e6cdbef8259d62bdd4f45850787ad427cb4e1c8) - publish package size must be less than 20MB and will show warning when larger than 10MB *(commit by [@zxypro1](https://github.com/zxypro1))*:

  publish package size must be less than 20MB and will show warning when larger than 10MB


### :sparkles: New Features
- [`4d53dff`](https://github.com/Serverless-Devs/Serverless-Devs/commit/4d53dffd7b3fb80a2d3eaf2f1e9184ce0172b24c) - remove props key if value is undefined or null *(commit by [@zxypro1](https://github.com/zxypro1))*
- [`3e6cdbe`](https://github.com/Serverless-Devs/Serverless-Devs/commit/3e6cdbef8259d62bdd4f45850787ad427cb4e1c8) - publish package size must be less than 20MB and will show warning when larger than 10MB *(commit by [@zxypro1](https://github.com/zxypro1))*
- [`cdfad5c`](https://github.com/Serverless-Devs/Serverless-Devs/commit/cdfad5c5b6f659259d7e616194f5c13f8d7f3ce0) - variables, build, publish yaml validation *(commit by [@zxypro1](https://github.com/zxypro1))*
- [`d56c0eb`](https://github.com/Serverless-Devs/Serverless-Devs/commit/d56c0eb1e1de663bd12942e90b446add8738b860) - add duplicate variables validation *(commit by [@zxypro1](https://github.com/zxypro1))*
- [`350bf67`](https://github.com/Serverless-Devs/Serverless-Devs/commit/350bf67a4f02e75938ff12e96295ca127fa84feb) - support cond *(commit by [@zxypro1](https://github.com/zxypro1))*

### :bug: Bug Fixes
- [`0142da8`](https://github.com/Serverless-Devs/Serverless-Devs/commit/0142da81e1017bf2e84877c6452ba89a12ba8524) - beta.x.x#x url error *(commit by [@zxypro1](https://github.com/zxypro1))*
- [`833e9aa`](https://github.com/Serverless-Devs/Serverless-Devs/commit/833e9aa06034c71df05e53b4f5c9929a40165251) - aliyun task worker won't have stderr *(commit by [@zxypro1](https://github.com/zxypro1))*
- [`29faf72`](https://github.com/Serverless-Devs/Serverless-Devs/commit/29faf72b14eb9177ebd3cba0a383390489149bc4) - variable.yaml *(commit by [@zxypro1](https://github.com/zxypro1))*

### :wrench: Chores
- [`a7f137a`](https://github.com/Serverless-Devs/Serverless-Devs/commit/a7f137ab11adb644b4d8736e3160d408a92cce32) - more validate info *(commit by [@zxypro1](https://github.com/zxypro1))*


## [v3.1.3] - 2024-11-07
### :bug: Bug Fixes
- [`6c59ee3`](https://github.com/Serverless-Devs/Serverless-Devs/commit/6c59ee35d08b01fed3a225d6038679cea9ba8c51) - init error when template have if else *(commit by [@zxypro1](https://github.com/zxypro1))*


## [v3.1.2] - 2024-10-28
### :sparkles: New Features
- [`88850cf`](https://github.com/Serverless-Devs/Serverless-Devs/commit/88850cf3c3b59ec732d4bf371359af44cd6c3be8) - if resource does not exist in baseline yaml, diffs will be empty *(commit by [@zxypro1](https://github.com/zxypro1))*
- [`c7e7037`](https://github.com/Serverless-Devs/Serverless-Devs/commit/c7e7037677f27a9c15913c4e6879201f34627d1c) - when -f, ${resources.info} don't throw error *(commit by [@zxypro1](https://github.com/zxypro1))*
- [`076b778`](https://github.com/Serverless-Devs/Serverless-Devs/commit/076b77802b64a576588f9a6c7fddcd3c5c051fab) - volcano engine add node20 template *(commit by [@zxypro1](https://github.com/zxypro1))*
- [`4802487`](https://github.com/Serverless-Devs/Serverless-Devs/commit/4802487894557d47a84157b12108fb2adc921f83) - aliyun-cli support StsToken *(commit by [@zxypro1](https://github.com/zxypro1))*

### :bug: Bug Fixes
- [`a2f31be`](https://github.com/Serverless-Devs/Serverless-Devs/commit/a2f31bec5f16cca57ad36d1cd032c42daed9da2e) - `s config get` access error message *(commit by [@zxypro1](https://github.com/zxypro1))*
- [`3731ca8`](https://github.com/Serverless-Devs/Serverless-Devs/commit/3731ca8797c0b91a530e5ca2b79f9e2315b4b697) - cicd env won't show permission warn *(commit by [@zxypro1](https://github.com/zxypro1))*
- [`a0e9aef`](https://github.com/Serverless-Devs/Serverless-Devs/commit/a0e9aef11b68bec32a73c34f5fb5ad0b1f2f7c92) - devs art template won't support {{}} *(commit by [@zxypro1](https://github.com/zxypro1))*
- [`e9149b8`](https://github.com/Serverless-Devs/Serverless-Devs/commit/e9149b8efc0a2e4e90cc2d606961017a65e21fff) - acc type invalid *(commit by [@zxypro1](https://github.com/zxypro1))*


## [v3.1.1] - 2024-08-23
### :sparkles: New Features
- [`bf60b54`](https://github.com/Serverless-Devs/Serverless-Devs/commit/bf60b545a539b80f2c6135b714c41f9ca16c75b3) - support ${this.vars} ${resources.xx.vars} *(commit by [@zxypro1](https://github.com/zxypro1))*
- [`f1bc8d2`](https://github.com/Serverless-Devs/Serverless-Devs/commit/f1bc8d20b0ba353bde6b19eb5a4d2e4a2a3798ec) - add secret command *(commit by [@zxypro1](https://github.com/zxypro1))*
- [`25f15f3`](https://github.com/Serverless-Devs/Serverless-Devs/commit/25f15f3d0c82ec125b7e5e4d7d68f85cb9dc3b6c) - preview ${config} won't throw error, ${secret} will be hidden *(commit by [@zxypro1](https://github.com/zxypro1))*
- [`3db2430`](https://github.com/Serverless-Devs/Serverless-Devs/commit/3db243055e6ab0fb3653e459bc476b2e44abb4db) - when -o, --output-format exist, allow failure *(commit by [@zxypro1](https://github.com/zxypro1))*
- [`d0f8bd6`](https://github.com/Serverless-Devs/Serverless-Devs/commit/d0f8bd6be63f7ab7aaccf195f38fbfaedaf1aa4a) - add `--baseline-template`, submit diff result to component *(commit by [@zxypro1](https://github.com/zxypro1))*
- [`c618b3e`](https://github.com/Serverless-Devs/Serverless-Devs/commit/c618b3eb16fb8adec3e7ec6be8ba1a70db621738) - support {self.xx} *(commit by [@zxypro1](https://github.com/zxypro1))*
- [`a7fc08e`](https://github.com/Serverless-Devs/Serverless-Devs/commit/a7fc08e373f74f7313d5f8191f25a4306588b951) - support ${shared} *(commit by [@zxypro1](https://github.com/zxypro1))*

### :bug: Bug Fixes
- [`3595991`](https://github.com/Serverless-Devs/Serverless-Devs/commit/3595991d7be8886590dd0623e4c44e124793d104) - load-application *(commit by [@zxypro1](https://github.com/zxypro1))*
- [`cab786d`](https://github.com/Serverless-Devs/Serverless-Devs/commit/cab786d13e8b63c2e951d002bf6bb1703f609977) - env work without s.yaml *(commit by [@zxypro1](https://github.com/zxypro1))*
- [`ee88d72`](https://github.com/Serverless-Devs/Serverless-Devs/commit/ee88d724f38058dfa8b48b9d14f0b56dcd6381d5) - DEBUG support fix *(commit by [@zxypro1](https://github.com/zxypro1))*
- [`23358b3`](https://github.com/Serverless-Devs/Serverless-Devs/commit/23358b3ecd0dfafa947ad30d044909f0a36205c3) - sts api fail *(commit by [@zxypro1](https://github.com/zxypro1))*

### :wrench: Chores
- [`8613121`](https://github.com/Serverless-Devs/Serverless-Devs/commit/86131211c11b802e46de54f987f04dbf2b3406d9) - hide --baseline-template *(commit by [@zxypro1](https://github.com/zxypro1))*


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
[v3.1.1]: https://github.com/Serverless-Devs/Serverless-Devs/compare/v3.1.0...v3.1.1
[v3.1.2]: https://github.com/Serverless-Devs/Serverless-Devs/compare/v3.1.1...v3.1.2
[v3.1.3]: https://github.com/Serverless-Devs/Serverless-Devs/compare/v3.1.2...v3.1.3
[v3.1.4]: https://github.com/Serverless-Devs/Serverless-Devs/compare/v3.1.3...v3.1.4
[v3.1.5]: https://github.com/Serverless-Devs/Serverless-Devs/compare/v3.1.4...v3.1.5
[v3.1.6]: https://github.com/Serverless-Devs/Serverless-Devs/compare/v3.1.5...v3.1.6
[v3.1.7]: https://github.com/Serverless-Devs/Serverless-Devs/compare/v3.1.6...v3.1.7
[v3.1.9]: https://github.com/Serverless-Devs/Serverless-Devs/compare/v3.1.8...v3.1.9
[v3.1.10]: https://github.com/Serverless-Devs/Serverless-Devs/compare/v3.1.9...v3.1.10
