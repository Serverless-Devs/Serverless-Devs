export function publish() {}
export function list() {}
export function versionConfig() {}
export function versions() {}
// export function deleteVersion() {}
// export function deleteLayer() {}


/**
 * s layer <sub-command>\n
 * @pre_help
 * {"header":"Layer","content":"Resource layer operation"}
 * @after_help
 * {"header":"SubCommand List","content":[{"desc":"publish","example":"New layer version, you can get help through [s layer publish -h]"},{"desc":"list","example":"Get layer list, you can get help through [s layer list -h]"},{"desc":"versionConfig","example":"Get layer versionConfig, you can get help through [s layer versionConfig -h]"},{"desc":"versions","example":"Get layer versions, you can get help through [s layer versions -h]"}]}
 */
export interface LayerInputsArgs {
}

/**
 * s layer publish <options>\n
 * @pre_help
 * {"header":"Layer publish","content":"New layer version"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header":"Examples with Yaml","content":["$ s layer publish --layer-name testName --code ./src","$ s exec -- layer publish --layer-name testName --code ./src"]}
 * @example
 * {"header":"Examples with CLI","content":["$ s cli fc layer publish --region cn-hangzhou --layer-name testName --code ./src --compatible-runtime nodejs12,nodejs10,python3"]}
 */
export interface LayerPublishInputsArgs {
  /**
   *  Specify the region of alicloud
   */
  region: string;
  /**
   *  Specify the layer name parameter
   */
  'layer-name': string;
  /**
   *  Specify the description parameter
   */
  'description': string;
  /**
   *  Specify the code parameter
   */
  'code': string;
  /**
   *  Specify the compatibleRuntime parameter
   */
  'compatible-runtime': string;
}

/**
 * s layer list\n
 * @pre_help
 * {"header":"Layer list","content":"Get layer list"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header":"Examples with Yaml","content":["$ s layer list"]}
 * @example
 * {"header":"Examples with CLI","content":["$ s cli fc layer list --region cn-hangzhou --prefix test"]}
 */
export interface LayerListInputsArgs {
  /**
   *  Specify the region of alicloud
   */
  region: string;
  /**
   *  Specify the prefix parameter
   */
  'prefix': string;
  /**
   *  Table format output
   */
  'table': boolean;
}

/**
 * s layer versionConfig <options>\n
 * @pre_help
 * {"header":"Layer versionConfig","content":"Get layer version config"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header":"Examples with Yaml","content":["$ s layer versionConfig --layer-name name --version-id 1"]}
 * @example
 * {"header":"Examples with CLI","content":["$ s cli fc layer versionConfig --region cn-hangzhou --layer-name name --version-id 1"]}
 */
export interface LayerVersionConfigInputsArgs {
  /**
   *  Specify the region of alicloud
   */
  region: string;
  /**
   *  Specify the layer name parameter
   */
  'layer-name': string;
  /**
   *  Specify the version parameter
   */
  'version-id': number;
}

/**
 * s layer deleteVersion <options>\n
 * @pre_help
 * {"header":"Layer deleteVersion","content":"Delete layer version"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header":"Examples with Yaml","content":["$ s layer deleteVersion --layer-name name --version-id 1"]}
 * @example
 * {"header":"Examples with CLI","content":["$ s cli fc layer deleteVersion --region cn-hangzhou --layer-name name --version-id 1"]}
 */
export interface LayerDeleteVerisonInputsArgs {
  /**
   *  Specify the region of alicloud
   */
  region: string;
  /**
   *  Specify the layer name parameter
   */
  'layer-name': string;
  /**
   *  Specify the version parameter
   */
  'version-id': number;
}

/**
 * s layer versions\n
 * @pre_help
 * {"header":"Layer versions","content":"Get layer versions"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header":"Examples with Yaml","content":["$ s layer versions --layer-name name"]}
 * @example
 * {"header":"Examples with CLI","content":["$ s cli fc layer versions --region cn-hangzhou --layer-name name"]}
 */
export interface LayerVersionsInputsArgs {
  /**
   *  Specify the region of alicloud
   */
  region: string;
  /**
   *  Specify the layer name parameter
   */
  'layer-name': string;
  /**
   *  Table format output
   */
  'table': boolean;
}

/**
 * s layer deleteLayer\n
 * @pre_help
 * {"header":"Layer deleteLayer","content":"Delete layer all version"}
 * @after_help
 * {"ref":"GlobalParams"}
 * @example
 * {"header":"Examples with Yaml","content":["$ s layer deleteLayer --layer-name name"]}
 * @example
 * {"header":"Examples with CLI","content":["$ s cli fc layer deleteLayer --region cn-hangzhou --layer-name name"]}
 */
export interface LayerDeleteLayerInputsArgs {
  /**
   *  Specify the region of alicloud
   */
  region: string;
  /**
   *  Specify the layer name parameter
   */
  'layer-name': string;
  /**
   *  Assume that the answer to any question which would be asked is yes
   * @alias y
   */
  'assume-yes': boolean;
}
