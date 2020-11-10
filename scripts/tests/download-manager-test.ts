import { DownloadManager } from "../../src/init/download-manager";
import * as fs from "fs-extra";
import * as download from "download";
import * as path from "path";
import * as os from "os";
import * as childProcess from "child_process";
import * as urlParser from "../../src/utils/url-parser";
import { expect } from "chai";
const sinon = require("sinon");
const assert = require("assert");

describe("InitManager", function () {
  let downloadManager: DownloadManager;

  before(() => {
    downloadManager = new DownloadManager();
  });

  describe("#downloadTemplateByUrl()", function () {
    const sandbox = sinon.createSandbox();

    beforeEach(() => {});

    afterEach(() => {
      sandbox.restore();
    });

    it("should download and copy for normal git template", async function () {
      const notExistsDir = "notExistsDirJustForUnitTest";
      const zipFile = "http://github.com/test/test.zip";
      const repoName = "test";

      sandbox.stub(downloadManager, "proxyDownload");
      const copySyncStub = sandbox.stub(fs, "copySync");
      await downloadManager.downloadTemplateByUrl(
        { zipFile, hasSubPath: false, repoName },
        notExistsDir,
      );
      copySyncStub.calledWith(path.join(os.tmpdir(), repoName), notExistsDir, {
        dereference: true,
      });
    });

    it("should download and copy sub dir for git template with subDir", async function () {
      const notExistsDir = "notExistsDirJustForUnitTest";
      const zipFile = "http://github.com/test/test.zip";
      const repoName = "test";
      const subpath = "subpath";

      sandbox.stub(downloadManager, "proxyDownload");
      const copySyncStub = sandbox.stub(fs, "copySync");
      await downloadManager.downloadTemplateByUrl(
        { zipFile, hasSubPath: true, subPath: subpath, repoName },
        notExistsDir,
      );
      const srcDir = path.join(os.tmpdir(), repoName, subpath);
      const destDir = path.join(notExistsDir, subpath);
      copySyncStub.calledWith(path.join(os.tmpdir(), repoName), notExistsDir, {
        dereference: true,
      });
    });

    it("should throw error if output dir exists for http template", async function () {
      const dir = "test";
      const zipFile = "http://github.com/test/test.zip";
      const repoName = "test";
      const execStub = sandbox.stub(childProcess, "exec");
      sandbox.stub(fs, "existsSync").returns(true);

      try {
        await downloadManager.downloadTemplateByUrl(
          { zipFile, hasSubPath: false, repoName },
          dir,
        );
        assert.fail("should throw an error");
      }
 catch (err) {
        expect(err).to.match(/Directory already exists/);
      }
    });
  });

  describe("#downloadTemplateByGitClone()", function () {
    const sandbox = sinon.createSandbox();

    beforeEach(() => {});

    afterEach(() => {
      sandbox.restore();
    });

    it("should clone git template for git protocol", async function () {
      const notExistsDir = "notExistsDirJustForUnitTest";
      const url = "git@github.com:mochajs/mocha.git";
      const execStub = sandbox.stub(childProcess, "exec");

      downloadManager.downloadTemplateByGitClone(urlParser.parse(url), notExistsDir);
      execStub.calledWith(`git clone ${url} ${notExistsDir}`);
    });

    it("should throw error if output dir exists for git clone", async function () {
      const dir = "test";
      const url = "git@github.com:mochajs/mocha.git";
      const execStub = sandbox.stub(childProcess, "exec");
      sandbox.stub(fs, "existsSync").returns(true);

      try {
        await downloadManager.downloadTemplateByGitClone(urlParser.parse(url), dir);
        assert.fail("should throw an error");
      }
 catch (err) {
        expect(err).to.match(/Directory already exists/);
      }
    });

    it("should throw error if exec failed", async function () {
      const notExistsDir = "notExistsDirJustForUnitTest";
      const url = "git@github.com:mochajs/mocha.git";
      const execStub = sandbox.stub(childProcess, "exec");
      execStub.throws(new Error("Failed"));

      try {
        await downloadManager.downloadTemplateByGitClone(urlParser.parse(url), notExistsDir);
        assert.fail("should throw an error");
      }
 catch (err) {
        expect(err).to.match(/Failed/);
      }
    });
  });

  /*
     async downloadTemplateByGitClone(url: URL.Url, outputDir: string) {
        if (fs.existsSync(outputDir)) {
            throw new Error("Directory already exists: " + outputDir);
        }

        let cmd = `git clone ${url.href} ${outputDir}`;
        const exec = util.promisify(ChildProcess.exec);
        try {
            await exec(cmd);
        } catch(err) {
            throw err;
        }
    }
*/
});
