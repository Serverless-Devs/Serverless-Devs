export function get() {}
export function list() {}
export function put() {}

/**
 * s provision <sub-command>\n
 * @pre_help
 * {"header":"Provision","content":"Resource reservation operation"}
 * @after_help
 * {"header":"SubCommand List","content":[{"desc":"list","example":"View the list of resource reservation, you can get help through [s provision list -h]"},{"desc":"put","example":"Put resource reservation, you can get help through [s provision put -h]"},{"desc":"get","example":"Get resource reservation, you can get help through [s provision get -h]"}]}
 */
export interface ProvisionInputsArgs {
}


/**
 * s provision get\n
 * @pre_help
 * {"header":"Provision get","content":"Get provision configuration"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header": "Examples with Yaml","content": ["$ s provision get --qualifier alias"]}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc provision get --region cn-hangzhou --service-name name --function-name name --qualifier alias"]}
 */
export interface ProvisionGetInputsArgs {
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
 * s provision put\n
 * @pre_help
 * {"header":"Provision put","content":"Set reserved configuration"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header":"Examples with Yaml","content":["$ s provision put --target 1 --qualifier alias","$ s provision put --config ./provision.json --qualifier alias","$ s exec -- provision put --target 1 --qualifier alias"]}
 * @example
 * {"header":"Examples with CLI","content":["$ s cli fc provision put --region cn-hangzhou --service-name name --function-name name --qualifier alias --target 1","$ s cli fc provision put --region cn-hangzhou --service-name name --function-name name --qualifier alias --config ./provision.json"]}
 */
export interface ProvisionPutInputsArgs {
  /**
   *  Specify the region of alicloud
   */
  region: string;
  /**
    *  Specify the alicloud fc service name
    */
  'service-name': string;
  /**
    *  Specify the qualifier parameter. Only supports LATEST and alias
    */
  'qualifier': string;
  /**
    *  Specify the provision target parameter
    */
  'target': number;
  /**
    *  Specify the configuration path parameter
    */
  'config': string;
}

/**
 * s provision list\n
 * @pre_help
 * {"header":"Provision list","content":"View the list of provision"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header": "Examples with Yaml","content": ["$ s provision list"]}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc provision list --region cn-hangzhou --service-name name"]}
 */
export interface ProvisionListInputsArgs {
  /**
   *  Specify the region of alicloud
   */
  region: string;
  /**
    *  Specify the alicloud fc service name
    */
  'service-name': string;
  /**
    *  Specify the qualifier parameter. Only supports LATEST and alias
    */
  'qualifier': string;
  /**
   *  Table format output
   */
  table: boolean;
}
