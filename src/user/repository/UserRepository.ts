import { User } from '../domain/User';

export interface UserRepository {
  findById(userId: string): Promise<User>;

  findByEmail(email: string): Promise<User> | null;

  save(user: User): Promise<User>;

  updateRefreshToken(userId: string, token: string): Promise<number>;

  findByPhone(phone: string): Promise<string> | null;

  updateChangeToken(userId: string, token: string): Promise<void>;

  findByChangePassVerifyToken(token: string): Promise<string> | null;

  cleanupTokenById(userId: string): Promise<number>;

  updateChangePassword(
    userEmail: string,
    userPassword: string,
  ): Promise<number>;

  removeChangeToken(email: string): Promise<void>;

  createUserStudyDay(userId: string, day: string): Promise<number>;

  removeUser(userId: string): Promise<void>;
}
