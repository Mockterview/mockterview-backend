export class EmailRequestDto {
  readonly email: string;

  constructor(email: string) {
    this.email = email;
  }
}
