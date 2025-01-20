import { User } from 'src/users/entities/user.entity';

export default class AuthRequest extends Request {
  user: User;
}
