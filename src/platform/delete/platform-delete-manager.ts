import axios from 'axios';
import logger from '../../utils/logger';
import { PlatformDeleteError } from '../../error/platform-delete-error';
import { SERVERLESS_DELETE_PACKAGE_URL } from '../../constants/static-variable';

export class PlatformDeleteManager {

  async delete(name: string, version: string, type: string, provider: string, user: string) {
    const options = {
      url: SERVERLESS_DELETE_PACKAGE_URL,
      method: 'delete',
      timeout: 5000,
      headers: {
        'User-Agent': 's'
      },
      params: {
        name: name,
        version: version,
        type: type,
        provider: provider,
        user: user
      }
    };

    let result;
    try {
      logger.info('Deleting......');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      result = await axios.request(options);
    } catch (err) {
      throw new PlatformDeleteError('Failed to delete package, error: {{error}}', {error: err.message});
    }

    if (result.status !== 200) {
      throw new PlatformDeleteError('Failed to delete package, http status code: {{code}}', {code: result.status});
    }
    if (result.data.Error) {
      throw new PlatformDeleteError('Failed to delete package, code: {{code}}, message: {{msg}}', {
        code: result.data.Error.Code,
        msg: result.data.Error.Message
      });
    }
    logger.success('Delete successfully');
  }
}