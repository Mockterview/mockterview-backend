export interface ISendMessage {
  sendSlack(
    channel: string,
    msgTitle: string,
    objToFlatten: object,
  ): Promise<number>;

  sendSms(
    phone: string,
    subject: string,
    msg: string,
    timeToBeDelivered: string | null,
  ): Promise<number>;

  sendEmail(
    title: string,
    htmlContent: string,
    receiver: string,
  ): Promise<number>;

  sendAlimtalk(
    templateCode: string,
    userId: string,
    tagData: { [key: string]: string },
    channelId: string,
  ): Promise<number>;
}
