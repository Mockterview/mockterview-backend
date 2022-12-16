import { User } from '../../../user/domain/User';

export class VerifyUserDto {
  public _id: string;
  public email: string;
  public name: string;
  public phone: string;

  constructor(private user: User) {
    this._id = user._id;
    this.email = user.email;
    this.name = user.name;
    this.phone = user.phone;
  }

  toJSON() {
    return {
      _id: this._id,
      email: this.email,
      name: this.name,
      phone: this.phone,
    };
  }
}
