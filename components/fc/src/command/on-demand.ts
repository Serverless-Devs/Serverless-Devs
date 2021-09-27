export function get() {}
export function put() {}
export function list() {}
// export function _delete() {}

/**
 * s onDemand <sub-command>\n
 * @pre_help
 * {"header":"OnDemand","content":"Resource on-demand operation"}
 * @after_help
 * {"header":"SubCommand List","content":[{"desc":"list","example":"View the list of resource on-demand, you can get help through [s onDemand list -h]"},{"desc":"put","example":"Put resource on-demand, you can get help through [s onDemand put -h]"},{"desc":"get","example":"Get resource on-demand, you can get help through [s onDemand get -h]"}]}
 */
export interface OnDemandInputsArgs {
}

/**
 * s onDemand get\n
 * @pre_help
 * {"header":"OnDemand get","content":"Get on-demand configuration"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header": "Examples with Yaml","content": ["$ s onDemand get --qualifier pre"]}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc onDemand get --region cn-hangzhou --service-name name --function-name name --qualifier alias"]}
 */
export interface OnDemandGetInputsArgs {
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
    *  Specify the qualifier parameter. Only supports LATEST and alias
    */
  'qualifier': string;
}


/**
 * s onDemand list\n
 * @pre_help
 * {"header":"OnDemand list","content":"View the list of on-demand"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header": "Examples with Yaml","content": ["$ s onDemand list"]}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc onDemand list --region cn-hangzhou --service-name name"]}
 */
export interface OnDemandListInputsArgs {
  /**
   *  Specify the region of alicloud
   */
  region: string;
  /**
    *  Specify the alicloud fc service name
    */
  'service-name': string;
  /**
   *  Table format output
   */
  table: boolean;
}

/**
 * s onDemand delete\n
 * @pre_help
 * {"header":"OnDemand delete","content":"Delete on-demand configuration"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header": "Examples with Yaml","content": ["$ s onDemand delete --qualifier pre"]}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc onDemand delete --region cn-hangzhou --service-name name --function-name name --qualifier alias"]}
 */
export interface OnDemandDeleteInputsArgs {
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
    *  Specify the qualifier parameter. Only supports LATEST and alias
    */
  'qualifier': string;
}

/**
 * s onDemand put\n
 * @pre_help
 * {"header":"OnDemand put","content":"Set reserved configuration"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header": "Examples with Yaml","content": ["$ s onDemand put --qualifier pre --maximum-instance-count 1"]}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc onDemand put --region cn-hangzhou --service-name name --function-name name --qualifier alias --max 1"]}
 */
export interface OnDemandPutInputsArgs {
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
    *  Specify the qualifier parameter. Only supports LATEST and alias
    */
  'qualifier': string;
  /**
    *  Specify the maximumInstanceCount parameter
    * @alias -max
    */
  'maximum-instance-count': string;
}
