export class SignupRequestDto {
  readonly email: string;
  readonly name: string;
  readonly phone: string;
  readonly password: string;

  constructor(email: string, name: string, phone: string, password: string) {
    this.email = email;
    this.name = name;
    this.phone = phone;
    this.password = password;
  }
}
