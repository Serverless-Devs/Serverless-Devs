import axios from 'axios';
import path from 'path';
import { getRootHome } from '@serverless-devs/utils';
import fs from 'fs-extra';

class Templates {
  aliMenuPath: string;
  constructor() {
    this.aliMenuPath = path.join(getRootHome(), 'config', 'ali-template.json');
  }

  async update() {
    await axios
      .get('https://images.devsapp.cn/bin/s/ali-template.json', { timeout: 3000 })
      .then(res => {
        const { data } = res;
        const fileContent = fs.readJSONSync(this.aliMenuPath);
        if (fileContent['version'] !== data['version']) {
          fs.writeJSONSync(this.aliMenuPath, data, { spaces: 2 });
        }
      })
      .catch(err => {
        console.log('Sync templates failed. Use existing templates.');
      });
  }
}

export default Templates;
