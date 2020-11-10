import * as program from "commander";
import { getInputData } from "../common/common";
import i18n from "../../utils/i18n";
import { UpdateManager } from "./update-manager";
import { ConfigUpdateError } from "../../error/config-update-error";
import { CommandError } from "../../error/command-error";

const wrongInput =
  "Update failed: Please input right format. You can obtain the key information through: s config update -h";
const description = i18n.__("s config update help");

program
  .name("s config  update")
  .usage("[options] [name]")
  .helpOption("-h, --help", i18n.__("Display help for command"))
  .option(
    "-p,  --provider [name]",
    i18n.__("The cloud service provider. [alibaba/aws/azure/baidu/google/huawei/tencent]"),
  )
  .option(
    "-a , --alias-name [name]",
    i18n.__("Key pair alia, if the alias is not set, use default instead"),
  )
  .option("--AccountID [name]", i18n.__("Configure the AccountID"))
  .option("--AccessKeyID [name]", i18n.__("Configure the AccessKeyID"))
  .option("--AccessKeySecret [name]", i18n.__("Configure the AccessKeySecret"))
  .option("--SecretID [name]", i18n.__("Configure the SecretID"))
  .option("--SecretKey [name]", i18n.__("Configure the SecretKey"))
  .option("--SecretAccessKey [name]", i18n.__("Configure the SecretAccessKey"))
  .option("--KeyVaultName [name]", i18n.__("Configure the KeyVaultName"))
  .option("--TenantID [name]", i18n.__("Configure the TenantID"))
  .option("--ClientID [name]", i18n.__("Configure the ClientID"))
  .option("--ClientSecret [name]", i18n.__("Configure the ClientSecret"))
  .option("--PrivateKeyData [name]", i18n.__("Configure the PrivateKeyData"))
  .description(description)
  .parse(process.argv);

(async () => {
  if (
    program.args.length === 0 &&
    (program.provider == undefined || program.aliasName == undefined)
  ) {
    program.help();
  }
 else if (program.args.length > 0) {
    throw new ConfigUpdateError(wrongInput);
  }
  await new UpdateManager().updateManager(
    { Provider: program.provider, AliasName: program.aliasName },
    getInputData(program),
  );
})().catch((err) => {
  throw new CommandError(err.message);
});
