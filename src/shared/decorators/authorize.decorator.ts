import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';

export function Authorize() {
  return applyDecorators(UseGuards(AuthGuard));
}
