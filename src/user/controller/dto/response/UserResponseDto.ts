export class UserResponseDto {
  _id: string;
  email: string;
  name: string;

  constructor(_id: string, email: string, name: string) {
    this._id = _id;
    this.email = email;
    this.name = name;
  }
}
