import { ICancelMessage } from '../../port/in/cancel-message';
import { CancelMsgResDto } from '../../port/in/cancel-message/dto/res';
import { Injectable } from '@nestjs/common';

export const CancelMessageServiceToken = 'CancelMessageServiceToken';

@Injectable()
export class CancelMessageService implements ICancelMessage {
  cancelAlimtalk(
    templateCode: string,
    userId: string,
  ): Promise<CancelMsgResDto> {
    return Promise.resolve(undefined);
  }

  cancelAlimtalkMany(
    templateCodeList: string[],
    userId: string,
  ): Promise<CancelMsgResDto> {
    return Promise.resolve(undefined);
  }
}
