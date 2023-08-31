const pkg = require('../../package.json');
import { REPORT_BASE_URL } from '../constant';
import * as utils from '@serverless-devs/utils';
import isDocker from 'is-docker';
import axios from 'axios';
import { EReportType } from '../type';

interface IReportCommand {
  uid: string;
  argv: string[];
}

interface IReportInit {
  template: string;
}

class Report {
  url: string;
  constructor() {
    this.url = `${REPORT_BASE_URL}?APIVersion=0.6.0&cli_version=${pkg.version}&node_version=${process.version}&os=${utils.getCurrentEnvironment()}&isDocker=${isDocker()}`;
  }
  async reportCommand(payload = {} as IReportCommand) {
    const { argv = [] } = payload;
    this.url = `${this.url}&trackerType=${EReportType.command}`;
    if (argv.length > 0) {
      this.url = `${this.url}&trackerName=${`s ${argv.join(' ')}`}`;
    }
    if (payload.uid) {
      this.url = `${this.url}&mainUid=${payload.uid}`;
    }
    console.log(`report url: ${this.url}`);
    await this.report();
  }
  async reportInit(payload = {} as IReportInit) {
    this.url = `${this.url}&trackerType=${EReportType.init}&trackerName=${payload.template}`;
    console.log(`report url: ${this.url}`);
    await this.report();
  }
  private async report() {
    try {
      await axios.get(this.url, { timeout: 3000 });
      console.log('report successfully');
    } catch (e) {
      console.error(e);
    }
  }
}

export default Report;
