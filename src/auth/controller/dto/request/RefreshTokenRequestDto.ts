export class RefreshTokenRequestDto {
  _id: string;
  refreshToken: string;

  constructor(_id: string, refreshToken: string) {
    this._id = _id;
    this.refreshToken = refreshToken;
  }
}
