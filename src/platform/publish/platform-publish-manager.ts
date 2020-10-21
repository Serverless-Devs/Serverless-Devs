
import axios from 'axios';
import { PlatformPublishError } from '../../error/platform-publish-error';
import logger from '../../utils/logger';
import * as path from 'path';
import * as os from 'os';
const Zip = require('adm-zip');

const PUBLISH_PACKAGE_URL = 'http://tool.serverlessfans.com/api/package/put/object/url';

export class PlatformPublishManager {
  async publish(user: string, content: string, readme: string) {

    try {
      logger.info('Publishing......');
      //zip
      const zipFile = path.join(os.tmpdir(), this.generateUUID() + '.zip');
      var zipper = new Zip();
      zipper.addLocalFolder('src', 'src');
      zipper.writeZip(zipFile);
      //console.log(zipFile);

      const result = await axios.post(PUBLISH_PACKAGE_URL, {
        user: user,
        publish: content,
        readme: readme
      });
      // eslint-disable-next-line eqeqeq
      if (result.status != 200) {
        throw new Error(`Failed to publish package, http status code: ${result.status}`);
      }
      if (result.data.Error) {
        throw new Error(`Failed to publish package, code: ${result.data.Error.Code}, message: ${result.data.Error.Message}`);
      }
      const url: string = result.data.Response.Url;

      const options = {
        url,
        method: 'put',
        timeout: 30 * 60 * 1000,
        headers: {
          'User-Agent': 's'
        },
        data: zipper.toBuffer(),
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        transformRequest: (data: any, headers: any) => {
          delete headers.put;
          return data;
        }
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const uploadResult = await axios(options);
      // eslint-disable-next-line eqeqeq
      if (uploadResult.status != 200) {
        throw new Error(`Failed to upload package, status code is: ${uploadResult.status}, messge is : ${uploadResult}`);
      }
      logger.success('Publish successfully');
    } catch (err) {
      throw new PlatformPublishError(err.message);
    }
  }

  private generateUUID(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

}