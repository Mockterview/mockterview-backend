export type JwtSignOption = {
  jwtid?: string | undefined;
  secret?: string | Buffer;
  expiresIn?: string | number | undefined;
  notBefore?: string | number | undefined;
};
