import { IInputs } from '../lib/interface/interface';
import { componentMethodCaller } from '../lib/utils';

export async function setup(inputs: IInputs): Promise<any> {
  return await componentMethodCaller(inputs, 'devsapp/fc-remote-debug', 'setup');
}

export async function invoke(inputs: IInputs): Promise<any> {
  return await componentMethodCaller(inputs, 'devsapp/fc-remote-debug', 'invoke');
}

export async function cleanup(inputs: IInputs): Promise<any> {
  return await componentMethodCaller(inputs, 'devsapp/fc-remote-debug', 'cleanup');
}

/**
 * s remote <SubCommand> <options>\n
 * @pre_help
 * {"header":"Remote","content":"Remote invoke via proxied service."}
 * @pre_help
 * {"header": "Detail", "content": "Remote invoke with real net traffic via proxied service."}
 * @pre_help
 * {"header": "SubCommand List", "content": [{"name": "setup", "summary": "Setup the real remote service for debugging."},{"name": "invoke", "summary": "Invoke remote function."}, {"name": "cleanup", "summary": "Clean the related resource and environment."}]}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header": "Example","content": [{"desc":"Help for setup.","example":"$ s remote setup -h"},{"desc":"Help for invoke.","example":"$ s remote invoke -h"},{"desc":"Help for cleanup.","example":"$ s remote cleanup -h"}]}
 */
export interface RemoteInputsArgs {}

/**
 * s remote setup <options>\n
 * @pre_help
 * {"header":"Setup","content":"Setup Operation."}
 * @pre_help
 * {"header": "Detail", "content": "Setup for remote invoke via proxied service."}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header": "Example","content": [{"desc":"Setup with debug.","example":"$ s remote setup --config vscode --debug-port 3000"}]}
 */
export interface RemoteSetupInputsArgs {
  /**
   *  Select which IDE to use when debugging and output related debug config tips for the IDE. Options：'vscode, intellij'.
   *  @alias c
   */
  config: string;
  /**
   *  Specify the sandboxed container starting in debug mode, and exposing this port on localhost.
   *  @alias d
   */
  'debug-port': string;
  /**
   *   The temp directory mounted to /tmp , default to './.s/tmp/invoke/serviceName/functionName/'
   */
  'tmp-dir': string;
}

/**
 * s remote invoke <options>\n
 * @pre_help
 * {"header":"Invoke","content":"Invoke remote function."}
 * @pre_help
 * {"header": "Detail", "content": "Invoke remote function in the remote service. Need setup first"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header": "Example","content": [{"desc":"Just invoke.","example":"$ s remote invoke"},{"desc":"Invoke with event.","example":"$ s remote invoke --event string"}]}
 */
export interface RemoteInvokeInputsArgs {
  /**
   *  Event data (strings) passed to the function during invocation (default: "").Http function format refers to [https://github.com/devsapp/fc-remote-invoke#特别说明]
   *  @alias e
   */
  event: string;
  /**
   *  Event funtion: A file containing event data passed to the function during invoke. Http function: A file containing http request options sent to https strigger. Format refers to [https://github.com/devsapp/fc-remote-invoke#特别说明]
   *  @alias f
   */
  'event-file': string;
  /**
   *   Read from standard input, to support script pipeline.Http function format refers to [https://github.com/devsapp/fc-remote-invoke#特别说明]
   *   @alias s
   */
  'event-stdin': string;
}

/**
 * s remote cleanup <options>\n
 * @pre_help
 * {"header":"Cleanup","content":"Clean the related resource and environment."}
 * @pre_help
 * {"header": "Detail", "content": "Clean the helper resource and the tunnel container."}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header": "Example","content": [{"desc":"Just cleanup.","example":"$ s remote cleanup"}]}
 */
export interface RemoteCleanupInputsArgs {}
