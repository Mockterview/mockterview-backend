export class UserIdRequestDto {
  readonly userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }
}
