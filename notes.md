## features 🚀
- Throw exception when project name overlaps with commands. [#688](https://github.com/Serverless-Devs/Serverless-Devs/issues/688)
- Add report on `s cli` command.
- `s registry publish` now has a adaptive progress bar. The size unit will change with the size of the zip package.
- Remove `--project` in `s init`.
- Support report feature on v2 templates.
- Change `${target...}` into `${source...}` in env.yaml.
- Report trackerDesc.
- Multi-env: Run env component when using `s env` commands or with `--env` parameter.
  
## fix 🛠️
- `${this.vars.region}` cannot be changed by `env.yaml`.
- Compile fail when an attribute in yaml is ''.
- Some information missing when report.