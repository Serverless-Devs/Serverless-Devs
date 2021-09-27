export function list() {}
export function publish() {}
// export function _delete() {}

/**
 * s version <sub-command>\n
 * @pre_help
 * {"header":"Version","content":"Service version operation"}
 * @after_help
 * {"header": "SubCommand List", "content": [{"desc":"list","example":"View the list of service versions, you can get help through [s version list -h]"},{"desc":"publish","example":"Publish service version, you can get help through [s version publish -h]"}]}
 */
export interface VersionInputsArgs {
}

/**
 * s version list <options>\n
 * @pre_help
 * {"header":"Version list","content":"View the list of service versions"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header": "Examples with Yaml","content": ["$ s version list"]}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc version list --region cn-hangzhou --service-name name"]}
 */
export interface VersionListInputsArgs {
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
 * s version publish <options>\n
 * @pre_help
 * {"header":"Version publish","content":"Publish service version"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header": "Examples with Yaml","content": ["$ s version publish --description xxx"]}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc version publish --region cn-hangzhou --service-name name --description xxx"]}
 */
export interface VersionPublishInputsArgs {
  /**
   *  Specify the region of alicloud
   */
  region: string;
  /**
    *  Specify the alicloud fc service name
    */
  'service-name': string;
  /**
    *  Specify the description parameter
    */
  'description': string;
}

/**
 * s version remove <options>\n
 * @pre_help
 * {"header":"Version remove","content":"Delete service version"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header": "Examples with Yaml","content": ["$ s version remove --version-id xxx"]}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc version remove --region cn-hangzhou --service-name name --version-id xxx"]}
 */
export interface VersionDeleteInputsArgs {
  /**
   *  Specify the region of alicloud
   */
  region: string;
  /**
    *  Specify the alicloud fc service name
    */
  'service-name': string;
  /**
    *  Specify the version parameter
    */
  'version-id': string;
}

/**
 * s version removeAll <options>\n
 * @pre_help
 * {"header":"Version removeAll","content":"Delete service all version"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header": "Examples with Yaml","content": ["$ s version removeAll"]}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc version removeAll --region cn-hangzhou --service-name name"]}
 */
export interface VersionDeleteAllInputsArgs {
  /**
   *  Specify the region of alicloud
   */
  region: string;
  /**
    *  Specify the alicloud fc service name
    */
  'service-name': string;
}
