export function start() {}
export function clean() {}

/**
 * s stress <sub-command>\n
 * @pre_help
 * {"header":"Stress","content":"Stress test for the serverless application"}
 * @after_help
 * {"header": "SubCommand List", "content": [{"name":"start","summary":"Start stress test, you can get help through [s stress start -h]"},{"name":"clean","summary":"Clean the relevant resources , you can get help through [s stress clean -h]"}]}
 */
export interface StressInputsArgs {
}

/**
 * s stress clean <options>\n
 * @pre_help
 * {"header":"Stress clean","content":"Clean the relevant resources, including local html report files and helper resources."}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header": "Examples with Yaml","content": ["$ s stress clean -y"]}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc stress clean --region myRegion --access myAccess -y"]}
 */
export interface StressCleanInputsArgs {
  /**
   *  Specify the region of alicloud
   */
  region: string;
  /**
   *  Assume that the answer to any question which would be asked is yes
   * @alias y
   */
  'assume-yes': boolean;
}

/**
 * s stress start <options>\n
 * @pre_help
 * {"header":"Stress start","content":"Start stress test"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header": "Examples with Yaml","content": ["$ s stress start --payload-file ./payload.file", "$ s stress start --num-user 6 --spawn-rate 10 --run-time 30 --url myUrl --method POST --payload \"hello world\""]}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc stress start --num-user 6 --spawn-rate 10 --run-time 30 --function-type event --service-name myService --function-name myFunction --qualifier myQualifier --payload \"hello world\" --region myRegion --access myAccess","$ s cli fc stress start --num-user 6 --spawn-rate 10 --run-time 30 --function-type http --url myUrl --method POST --payload \"hello world\" --region myRegion --access myAccess"]}
 */
export interface StressStartInputsArgs {
  /**
   *  Specify the region of alicloud
   */
  region: string;
  /**
   *  Specify the alicloud fc service name
   */
  'service-name': string;
  /**
    *  Specify the alicloud fc function name
    */
  'function-name'?: string;
  /**
    *  Qualifier of the target function, only for --function-type event
    * @alias q
    */
  'qualifier'?: string;
  /**
   *  Target url, only for --function-type http
   * @alias u
   */
  'url': string;
  /**
   *  Number of the simulated users
   */
  'num-user': number;
  /**
   *  Increasing number of users per second
   */
  'spawn-rate': number;
  /**
   *  Intervals for stress
   */
  'run-time': number;
  /**
   *  Type of the target function, including event and http
   */
  'function-type': string;
  /**
   *  Target method, only for --function-type http
   */
  'method': string;
  /**
   *  For --function-type event, represents the event passed to the function;\nFor --function-type http, represents the request body passed to the function
   */
  'payload': string;
  /**
   *  For --function-type event, contains the event passed to the function;\nFor --function-type http, contains the request body passed to the function
   */
  'payload-file': string;
}
