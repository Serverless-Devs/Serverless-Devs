# YAML specifications

Serverless Devs allows you to use YAML to describe resources. We recommend that you use YAML to manage resources and actions.

Serverless Devs CLI can recognize the default YAML file `s.yaml`/`s.yml`. You can also use `-t/--template` to specify a YAML file with a different name. Serverless Devs CLI can recognize YAML files that conform to the following specifications:

```yaml
edition: 1.0.0        # The YAML specification version, which conforms to semantic versioning.
name: FullStack       #  The project name.
access: xxx-account1  #  The alias of the key.

vars: # [Global variables used by all services]
  logo: https://image.aliyun.com/xxxx.png
  domain: xxxx.yyy.com

services:
  nextjs-portal: #  The service name.
    access: xxx-account1  #  The alias of the key. This parameter can be omitted if it has the same value as the access of the project.
    component: vue-component  # The component name.
    props: # The property values of the component.
      src: ./frontend_src
      url: url
    actions: # The custom execution logic.
      pre-deploy: # Executed before deploy is run.
        - run: s exec -- publish  # The command lines to be executed.
          path: ./backend_src #  The path where the command lines are executed.
        - plugin: plugin-name # The plug-in to be executed.
      post-deploy: # Executed after deploy is run.
        - run: s clean
          path: ./frontend_src

  assets:
    component: static
    props:
      cache-control: "public, max-age=604800, immutable"
      www: "./public"

  express-blog:
    component: express
    props:
      app: ./express-blog
      url: ${vars.domain}
    actions:
      pre-deploy:
        - run: npm run build
          path: ./express-blog

  gateway:
    component: serverless-gateway # The gateway component that maps HTTP URLs to services based on rules.
    props:
      routes:
        - route: /~assets
          value: ${assets.outPut.url}
        - route: /
          value: ${nextjs-portal.output.url}
          index: index.html
        - route: /~portal
          value: ${nextjs-portal.output.url}
          inex: index.html
        - route: /~blog
          value: ${express-blog.output.url}
```


YAML supports the following variable formats:

- Get the environment variables in the current device: ${env(environment variable)}. Example: ${env(secretId)}
- Get variables from an external document: ${file(path)}. Example: ${file(./path)}
- Get global variables: ${vars.*}
- Get variables from other projects: ${projectName.props.*}
- Get result variables from other projects in a YAML file: ${projectName.output.*}

If a YAML file contains an excess number of projects, the system analyzes the order of deployments based on the following method:
1. Analyze the project dependency.
2. Dependent projects are deployed based on the order of dependencies. Independent projects are deployed in the order configured in the YAML format.
