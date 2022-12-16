import { BusinessException, ErrorDomain } from '../../exception';
import { HttpStatus } from '@nestjs/common';

export function isNullFactor(domain: ErrorDomain, key: string, value: any) {
  if (value === null || value === undefined) {
    throw new BusinessException(
      domain,
      `${key} is null or undefined`,
      `${key} is null or undefined`,
      HttpStatus.NOT_FOUND,
    );
  }
}
