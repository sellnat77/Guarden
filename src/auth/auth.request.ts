import { Request } from '@nestjs/common';

export default class AuthRequest extends Request {
  user: User;
}
