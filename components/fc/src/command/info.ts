
/**
 * s info <options>\n
 * @pre_help
 * {"header":"Info","content":"Query online resource details"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header": "Examples with Yaml","content": ["$ s {bold info}","$ s <ProjectName> {bold info}"]}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc info --region region --service-name serviceName --access accessName","$ s cli fc info --region region --service-name serviceName --function-name functionName --trigger-name triggerName --access accessName"]}
 */
export interface InfoInputsArgs {
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
   *  Specify the alicloud fc trigger name
   */
  'trigger-name'?: string;
}
