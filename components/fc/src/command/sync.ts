
/**
 * s sync <options>\n
 * @pre_help
 * {"header":"Sync","content":"Synchronize online resources to offline resources"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header": "Examples with Yaml","content": ["$ s sync", "$ s <ProjectName> sync", "$ s sync --region cn-hangzhou --service-name myService", "$ s exec -- sync  --region cn-hangzhou --service-name myService"]}
 * @example
 * {"header": "Examples with CLI","content": ["$ s cli fc sync --region cn-shanghai --service-name myService --type config"]}
 */
export interface SyncInputsArgs {
  /**
   *  Specify the region of alicloud.
   */
  region: string;
  /**
   *  Specify the alicloud fc service name.
   */
  'service-name': string;
  /**
   *  Specify the alicloud fc function name.
   */
  'function-name'?: string;
  /**
   *  Specify the alicloud fc trigger name, you can set names by using multiple trigger-name option, eg: --trigger-name triggerA --trigger-name triggerB.
   */
  'trigger-name'?: string;
  /**
   *  Mandatory overwrite code file
   *  @alias f
   */
  'force'?: boolean;
  /**
   *  Specify storage directory(default: current dir)
   */
  'target-dir'?: string;
  /**
   *  Operation type, code/config/all(default: all)
   */
  'type'?: 'code' | 'config' | 'all';
}
