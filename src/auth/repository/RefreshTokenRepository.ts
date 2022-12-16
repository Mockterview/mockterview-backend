export interface RefreshTokenRepository {
  updateRefreshToken(userId: string, token: string): void;
}
