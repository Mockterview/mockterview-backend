export class LoginResponseDto {
  constructor(
    public _id: string,
    public email: string,
    public name: string,
    public accessToken: string,
    public refreshToken: string,
  ) {}
}
