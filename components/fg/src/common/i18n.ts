import os from "os";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { I18n } from "i18n";

export function getConfig(key: string): any {
  const profile = getProfileFile();
  return profile[key];
}

export function getProfileFile() {
  let profileResult = {};
  try {
    const profileFilePath = getDefaultProfilePath();
    profileResult = yaml.load(fs.readFileSync(profileFilePath, "utf8")) || {};
  } catch (e) {
    console.log(e);
  }

  return profileResult;
}

export function getDefaultProfilePath(): string {
  return path.join(os.homedir(), ".s", "set-config.yml");
}

const i18n = new I18n({
  locales: ["en", "zh"],
  directory: path.join(__dirname, "..", "..", "locales"),
});

const locale = getConfig("locale");
if (locale) {
  i18n.setLocale(locale);
} else {
  i18n.setLocale("en");
}

export default i18n;
