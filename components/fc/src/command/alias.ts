export function list() {}
export function publish() {}
export function get() {}
// export function _delete() {}

/**
 * s alias <sub-command>\n
 * @pre_help
 * {"header":"Alias","content":"Service alias operation"}
 * @after_help
 * {"header": "SubCommand List", "content": [{"desc":"get","example":"Get alias details, you can get help through [s alias get -h]"},{"desc":"list","example":"View the list of service alias, you can get help through [s alias list -h]"},{"desc":"publish","example":"Publish service alias, you can get help through [s alias publish -h]"}]}
 */
export interface AliasInputsArgs {
}


/**
 * s alias get\n
 * @pre_help
 * {"header":"Alias get","content":"Get alias details"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header": "Examples with Yaml","content": ["$ s alias get --alias-name xxx"]}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc alias get --region cn-hangzhou --service-name name --alias-name xxx"]}
 */
export interface AliasGetInputsArgs {
  /**
   *  Specify the region of alicloud
   */
  region: string;
  /**
    *  Specify the alicloud fc service name
    */
  'service-name': string;
  /**
    *  Specify the alias name parameter
    */
  'alias-name': string;
}

/**
 * s alias list <options>\n
 * @pre_help
 * {"header":"Alias list","content":"View the list of service alias"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header": "Examples with Yaml","content": ["$ s alias list"]}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc alias list --region cn-hangzhou --service-name name"]}
 */
export interface AliasListInputsArgs {
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
  'table': boolean;
}

/**
 * s alias publish <options>\n
 * @pre_help
 * {"header":"Alias publish","content":"Publish service alias"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header": "Examples with Yaml","content": ["$ s alias publish --alias-name pre --version-id 2","$ s exec -- alias publish --description xxx --alias-name pre --version-id 2 --gversion 3 --weight 20"]}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc alias publish --region cn-hangzhou --service-name name --alias-name pre --version-id 2"]}
 */
export interface AliasPublishInputsArgs {
  /**
   *  Specify the region of alicloud
   */
  region: string;
  /**
    *  Specify the alicloud fc service name
    */
  'service-name': string;
  /**
    *  Specify the alicloud fc alias name
    */
  'alias-name': string;
  /**
    *  Specify the version parameter
    */
  'version-id': string;
  /**
    *  Specify the description parameter
    */
  'description': string;
  /**
    *  Specify the grayscale version id parameter
    */
  'gversion': string;
  /**
    *  Specify the weight parameter
    */
  'weight': string;
}

/**
 * s alias remove <options>\n
 * @pre_help
 * {"header":"Alias remove","content":"Delete service alias"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header": "Examples with Yaml","content": ["$ s alias remove --alias-name xxx"]}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc alias remove --region cn-hangzhou --service-name name --alias-name xxx"]}
 */
export interface AliasDeleteInputsArgs {
  /**
   *  Specify the region of alicloud
   */
  region: string;
  /**
    *  Specify the alicloud fc service name
    */
  'service-name': string;
  /**
    *  Specify the alias name parameter
    */
  'alias-name': string;
}

/**
 * s alias removeAll <options>\n
 * @pre_help
 * {"header":"Alias removeAll","content":"Delete service all alias"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header": "Examples with Yaml","content": ["$ s alias removeAll"]}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc alias removeAll --region cn-hangzhou --service-name name"]}
 */
export interface AliasDeleteAllInputsArgs {
  /**
   *  Specify the region of alicloud
   */
  region: string;
  /**
    *  Specify the alicloud fc service name
    */
  'service-name': string;
}
