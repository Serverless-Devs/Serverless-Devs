
/**
 * s metrics <options>\n
 * @pre_help
 * {"header":"Metrics","content":"Query function metrics information"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header":"Examples with Yaml","content":[{"example":"$ s metrics"},{"example":"$ s <ProjectName> metrics"},{"example":"$ s exec -- metrics --region cn-hangzhou --service-name myService --function-name myFunction"}]}
 * @example
 * {"header":"Examples with CLI","content":[{"example":"$ s cli fc metrics --region cn-hangzhou --service-name myService --function-name myFunction"}]}
 */
export interface MetricsInputsArgs {
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
}
