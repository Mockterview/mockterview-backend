export type TokenType = 'access' | 'refresh';

export class IssueTokenRequestDto {
  constructor(public _id: string) {}

  toJSON() {
    return {
      fresh: false,
      identity: {
        _id: this._id,
      },
    };
  }
}
