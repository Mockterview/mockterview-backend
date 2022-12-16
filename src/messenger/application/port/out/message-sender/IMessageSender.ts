export interface IMessageSender {
  sendAlimtalk(
    templateCode: string,
    userId: string,
    tagData: { [key: string]: string },
    channelId: string,
  ): Promise<number>;

  sendSlack(
    workspaceUrl: string,
    channel: string,
    text: string,
  ): Promise<number>;

  sendSms(
    phone: string,
    subject: string,
    msg: string,
    timeToBeDelivered: string | null,
  ): Promise<number>;

  sendMail(
    title: string,
    htmlContent: string,
    receiver: string,
    author: string,
    password: string,
  ): Promise<number>;
}
