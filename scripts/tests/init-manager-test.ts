import { InitManager } from "../../src/init/init-manager";
import { DownloadManager } from "../../src/init/download-manager";
import axios from "axios";
import * as inquirer from "inquirer";

const chai = require('chai');
const sinon = require('sinon');
chai.use(require('sinon-chai'));
const { expect } = require('chai');
const assert = require('assert');

describe('InitManager', function () {
    let initManager: InitManager;
    
    before(() => {
        initManager = new InitManager();
    });

    describe('#init()', function () {
        let sandbox = sinon.createSandbox();

        beforeEach(() => {
        });
    
        afterEach(() => {
            sandbox.restore();
        });

        it('should init success if download url template succeeds', async function () {
            try {
                //stub to return
                const downloadUrlTemplateStub = sandbox.stub(initManager, 'downloadUrlTemplate');
                downloadUrlTemplateStub.resolves("success");
                //call method
                await initManager.init("https://github.com/TypeStrong/ts-node", "test provider");
                //expect call once
                expect(downloadUrlTemplateStub).to.have.been.calledOnce;
            } catch (err) {
                assert.fail(err);
            }
        });

        it('should init success if download app template succeeds', async function () {
            try {
                const downloadAppTemplateStub = sandbox.stub(initManager, 'downloadAppTemplate');
                //stub to return
                downloadAppTemplateStub.resolves("success");
                //call method
                await initManager.init("test app", "test provider");
                //expect call once
                expect(downloadAppTemplateStub).to.have.been.calledOnce;
            } catch (err) {
                assert.fail(err);
            }
        });

        it('should throw error if downloadAppTemplate fail', async function () {
            try {
                const downloadAppTemplateStub = sandbox.stub(initManager, 'downloadAppTemplate');
                //(sinon) stub to throw a exception
                downloadAppTemplateStub.rejects(new Error("Failed"));
                //call method
                await initManager.init("test app", "test provider");
                //should not reach
                assert.fail("Exception not thrown");
            } catch (err) {
                //use Chai to check error thrown if expected
                expect(err).to.match(/Failed/);
            }
        });

        it('should throw error if downloadUrlTemplate fail', async function () {
            try {
                //stub to throw a exception
                const downloadUrlTemplateStub = sandbox.stub(initManager, 'downloadUrlTemplate');
                downloadUrlTemplateStub.rejects(new Error("Failed"));
                //call method
                await initManager.init("https://github.com/TypeStrong/ts-node", "test provider");
                //should not reach
                assert.fail("Exception not thrown");
            } catch (err) {
                //use Chai to check error thrown if expected
                expect(err).to.match(/Failed/);
            }
        });

    });

    describe('#downloadAppTemplate()', function () {
        let sandbox = sinon.createSandbox();

        beforeEach(() => {
        });
    
        afterEach(() => {
            sandbox.restore();
        });

        it('should call getAppProvider if provider not provided', async function () {
            const provider = "Aliyun";
            const project = "test project";
            
            const getAppProviderStub = sandbox.stub(initManager, "getAppProvider");
            getAppProviderStub.resolves(provider);
            //stub app download
            const getAppDownloadUrlStub = sandbox.stub(initManager, "getAppDownloadUrl");
            getAppDownloadUrlStub.withArgs(project, provider).resolves("https://oss.aliyun.com/app");
            //stub downloadManager
            let downloadManager = new DownloadManager();
            sandbox.stub(initManager, "downloadManager").value(downloadManager);
            //stub downloadManager.downloadTemplateByUrl
            const downloadTemplateByUrlStub = sandbox.stub(downloadManager, "downloadTemplateByUrl");
            downloadTemplateByUrlStub.resolves("success")
            //call method
            await initManager.downloadAppTemplate(project);
            expect(getAppProviderStub).to.have.been.calledOnce;
        });

        it('should throw InitError if get provider failed', async function() {
            const provider = "Aliyun";
            const project = "test project";

            const getAppProviderStub = sandbox.stub(initManager, "getAppProvider");
            const msg = "Failed to get app provider";
            getAppProviderStub.rejects(new Error(msg));
            //call method
            try {
                await initManager.downloadAppTemplate(project);
                assert.fail('should thrown a error');
            } catch(err) {
                expect(err.message).to.include(msg);
            }
        });
    });

    describe('#getAppDownloadUrl()', function () {
        let sandbox = sinon.createSandbox();

        beforeEach(() => {
        });
    
        afterEach(() => {
            sandbox.restore();
        });

        it('should return app download url if request successfully', async function () {
            const appDownloadUrl = "https://oss.aliyun.com";
            sandbox.stub(axios, 'request').resolves({status: 200, data:{Response:{Url: appDownloadUrl}}});
            //call
            const url = await initManager.getAppDownloadUrl("test project", "test provider");
            expect(url).to.equal(appDownloadUrl);
        });
    });

    describe('#getAppProvider()', function () {
        let sandbox = sinon.createSandbox();

        beforeEach(() => {
        });
    
        afterEach(() => {
            sandbox.restore();
        });

        it('should return app providers if request successfully', async function () {
            const aliyunProvider = "Aliyun";
            sandbox.stub(axios, 'request').resolves({status: 200, data:{Response:{Providers: [aliyunProvider]}}});
            sandbox.stub(inquirer, 'prompt').resolves({provider: aliyunProvider});
            //call
            const provider = await initManager.getAppProvider("test project");
            expect(provider).to.equal(aliyunProvider);
        
        });
    });

    describe('#downloadUrlTemplate()', function () {
        let sandbox = sinon.createSandbox();

        beforeEach(() => {
        });
    
        afterEach(() => {
            sandbox.restore();
        });

        it('should call downloadManager.downloadTemplateByUrl() for http git address', async function () {
            const url = "https://github.com/mochajs/mocha";

            let downloadManager = new DownloadManager();
            sandbox.stub(initManager, "downloadManager").value(downloadManager);
            const downloadTemplateByUrlStub = sandbox.stub(downloadManager, "downloadTemplateByUrl");
            
            await initManager.downloadUrlTemplate(url);

            expect(downloadTemplateByUrlStub).to.have.been.calledOnce;
        });

        it('should call downloadManager.downloadTemplateByUrl() for http git address', async function () {
            const url = "git@github.com:mochajs/mocha.git";

            let downloadManager = new DownloadManager();
            sandbox.stub(initManager, "downloadManager").value(downloadManager);
            const downloadTemplateByGitCloneStub = sandbox.stub(downloadManager, "downloadTemplateByGitClone");
            
            await initManager.downloadUrlTemplate(url);

            expect(downloadTemplateByGitCloneStub).to.have.been.calledOnce;
        });

        it('should throw error if unexpected protocol', async function () {
            const url = "ssh://host";

            try {
                await initManager.downloadUrlTemplate(url);
                assert.fail("should throw an error");
            } catch(err) {
                expect(err).to.match(/Unknown project format/);
            }
        });

        it('should throw error if unexpected host', async function () {
            const url = "http://unknown.com/";

            try {
                await initManager.downloadUrlTemplate(url);
                assert.fail("should throw an error");
            } catch(err) {
                expect(err).to.match(/Unknown host/);
            }
        });
    });
});
