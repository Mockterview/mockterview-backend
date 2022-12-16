export class ReissueAccessTokenResponseDto {
  _id: string;
  accessToken: string;

  constructor(_id: string, accessToken: string) {
    this._id = _id;
    this.accessToken = accessToken;
  }
}
