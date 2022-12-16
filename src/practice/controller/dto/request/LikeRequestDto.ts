export class LikeRequestDto {
  readonly userId: string;
  readonly myUserId: string;
  readonly practiceId: string;

  constructor(userId: string, myUserId: string, practiceId: string) {
    this.userId = userId;
    this.myUserId = myUserId;
    this.practiceId = practiceId;
  }
}
