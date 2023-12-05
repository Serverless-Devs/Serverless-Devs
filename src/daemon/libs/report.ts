import { REPORT_BASE_URL } from '@/constant';
import { ETrackerType } from '@serverless-devs/utils';
import axios from 'axios';
import { EReportType } from '@/type';

interface IReportParseException {
  userAgent: string;
  argv: string[];
  message: string;
}

type IReportRunTimeException = IReportParseException & {
  uid: string;
  component: string;
};

interface IReportCommand {
  userAgent: string;
  uid: string;
  argv: string[];
  component: string;
}

interface IReportInit {
  template: string;
}

class Report {
  url: string;
  constructor() {
    this.url = `${REPORT_BASE_URL}?APIVersion=0.6.0`;
  }
  private getUrl(payload = {} as Record<string, any>) {
    let temp = `trackerType=${payload.trackerType}`;
    const { argv = [] } = payload;
    if (argv.length > 0) {
      temp = `${temp}&trackerDesc=${`s ${argv.join(' ')}`}`;
    }
    if ('command' in payload) {
      temp = `${temp}&trackerName=${payload.command}`;
    }
    if ('userAgent' in payload) {
      temp = `${temp}&userAgent=${payload.userAgent}`;
    }
    if ('uid' in payload) {
      temp = `${temp}&mainUid=${payload.uid}`;
    }
    if ('component' in payload) {
      temp = `${temp}&component=${payload.component}`;
    }
    if ('message' in payload) {
      temp = `${temp}&message=${payload.message}`;
    }
    return temp;
  }
  async reportParseException(payload = {} as IReportParseException) {
    this.url = `${this.url}&${this.getUrl({ ...payload, trackerType: ETrackerType.parseException })}`;
    console.log(`report url: ${this.url}`);
    await this.report();
  }
  async reportRuntimeException(payload = {} as IReportRunTimeException) {
    this.url = `${this.url}&${this.getUrl({ ...payload, trackerType: ETrackerType.runtimeException })}`;
    console.log(`report url: ${this.url}`);
    await this.report();
  }
  async reportCommand(payload = {} as IReportCommand) {
    this.url = `${this.url}&${this.getUrl({ ...payload, trackerType: EReportType.command })}`;
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
