export class LogRequestDto {
  readonly deviceId: string;
  readonly pageName: string;
  readonly referrer: string;
  readonly agent: string;
  readonly url: string;

  constructor(
    deviceId: string,
    pageName: string,
    referrer: string,
    agent: string,
    url: string,
  ) {
    this.deviceId = deviceId;
    this.pageName = pageName;
    this.referrer = referrer;
    this.agent = agent;
    this.url = url;
  }
}
