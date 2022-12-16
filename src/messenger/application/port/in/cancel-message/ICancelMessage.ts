import { CancelMsgResDto } from './dto/res';

export interface ICancelMessage {
  cancelAlimtalk(
    templateCode: string,
    userId: string,
  ): Promise<CancelMsgResDto>;
  cancelAlimtalkMany(
    templateCodeList: string[],
    userId: string,
  ): Promise<CancelMsgResDto>;
}
