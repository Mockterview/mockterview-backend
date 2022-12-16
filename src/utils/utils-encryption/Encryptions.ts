import * as bcrypt from 'bcrypt';

export function hash(src: string) {
  return bcrypt.hashSync(src, bcrypt.genSaltSync());
}
