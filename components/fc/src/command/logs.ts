
/**
 * s logs <options>\n
 * @pre_help
 * {"header":"Logs","content":"Query the function log. You need to open SLS log service"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header": "Examples with Yaml","content": [{"desc":"Query logs in the time interval","example":"$ s exec -- logs -s 2021-06-07T02:54:00+08:00 -e 2021-06-07T02:54:59+08:00"},{"desc":"Continuous log output mode","example":"$ s exec -- logs -t"}]}
 * @example
 * {"header": "Examples with CLI","content": [{"example":"$ s cli fc logs --region cn-hangzhou --service-name myService --function-name myFunction -t"}]}
 */
export interface LogsInputsArgs {
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
   *  Log type query, value: failed
   */
  type?: string;
  /**
   *  Query according to requestId within the time interval
   */
  'request-id'?: string;
  /**
   *  Keyword query
   */
  keyword?: string;
  /**
   *  Query log end time (Timestamp or time format，like 1611827290000 or 2021-11-11T11:11:12+00:00)
   * @alias e
   */
  'end-time'?: string;
  /**
   *  Query log start time (Timestamp or time format，like 1611827290000 or 2021-11-11T11:11:12+00:00)
   * @alias s
   */
  'start-time'?: string;
  /**
   *  Continuous log output mode
   */
  tail?: boolean;
}
