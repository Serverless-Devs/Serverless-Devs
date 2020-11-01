import * as urlParser from '../../src/utils/url-parser';
const sinon = require('sinon');
const assert = require('assert');


describe('UrlParser', function () {

  describe('#getProjectNameFromUrl()', function () {
    let sandbox = sinon.createSandbox();

    beforeEach(() => {
    });
    
    afterEach(() => {
      sandbox.restore();
    });

    it('should extract project name for http git url without .git', async function () {
      const url = 'https://github.com/mochajs/mocha';
      const name = urlParser.getProjectNameFromUrl(url);
      assert.equal(name, 'mocha');
    });

    it('should extract template for http git url with .git', async function () {
      const url = 'https://github.com/mochajs/mocha.git';
      const {repoName, branch, ownerName} = urlParser.extractTemplateInfo(urlParser.parse(url));
      assert.equal(repoName, 'mocha');
      assert.equal(branch, 'master');
      assert.equal(ownerName, 'mochajs');
    });

    it('should extract template for http git url without .git', async function () {
      const url = 'https://github.com/mochajs/mocha/tree/master/scripts';
      const {repoName, branch, ownerName, subPath} = urlParser.extractTemplateInfo(urlParser.parse(url));
      assert.equal(repoName, 'mocha');
      assert.equal(branch, 'master');
      assert.equal(ownerName, 'mochajs');
      assert.equal(subPath, 'scripts');
    });


    //https://github.com/mochajs/mocha.git
  });
});