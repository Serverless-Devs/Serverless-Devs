
/**
 * s invoke <options>\n
 * @pre_help
 * {"header":"Invoke","content":"Invoke/trigger online functions"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header": "Examples with Yaml","content": ["$ s invoke","$ s <ProjectName> invoke"]}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc invoke --region cn-hangzhou --service-name myService --function-name myFunction --event <payload>","$ s cli fc info --region region --service-name serviceName --function-name functionName --trigger-name triggerName --access accessName", "$ s cli fc invoke --region cn-hangzhou --service-name myService --function-name myFunction --event-file <file-path>"]}
 */
export interface InvokeInputsArgs {
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
  'function-name': string;
  /**
   *  Invocation type: optional value "async"|"sync", default value "sync" (default: "sync")
   */
  'invocation-type'?: string;
  /**
   *  Event data (strings) passed to the function during invocation (default: "").Http function format refers to [https://github.com/devsapp/fc-remote-invoke#特别说明]
   */
  'event'?: string;
  /**
   *  Event funtion: A file containing event data passed to the function during invoke. Http function: A file containing http request options sent to http trigger. Format refers to [https://github.com/devsapp/fc-remote-invoke#特别说明]
   */
  'event-file'?: string;
  /**
   *  Read from standard input, to support script pipeline.Http function format refers to [https://github.com/devsapp/fc-remote-invoke#特别说明]
   */
  'event-stdin'?: string;
}
