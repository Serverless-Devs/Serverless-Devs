
/**
 * s cli fc fun2s <options>\n
 * @pre_help
 * {"header":"Fun2s","content":"Convert fun into exclusive configuration"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc fun2s --region cn-shenzhen --target ./s.yml"]}
 */
export interface Fun2SInputsArgs {
  /**
   *  Specify the region of alicloud
   */
  region?: string;
  /**
   *  Specify fun configuration path(default: template.[yaml|yml])
   */
  source?: string;
  /**
   *  Specify serverless devs configuration path(default: s.yaml)
   */
  target?: string;
  /**
   *  Mandatory overwrite s file
   */
  force?: string;
}
