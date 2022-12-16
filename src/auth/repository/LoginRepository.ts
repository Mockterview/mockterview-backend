import { LoginResponseDto } from '../controller/dto/response/LoginResponseDto';

export interface LoginRepository {
  loginByEmail(email: string, password: string): Promise<LoginResponseDto>;
}
