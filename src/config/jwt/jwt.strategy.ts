import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../user/user.entity';
import { Repository } from 'typeorm';
import { UserRole } from '../../user/userRole';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'abcd',
    });
  }

  async validate(payload: any) {
    const user = await this.userRepository.findOne({
      where: {
        id: payload.userId,
      },
    });

    if (!user) {
      throw new UnauthorizedException(
        '입력한 토큰에 해당하는 사용자는 존재하지 않습니다.',
        'NOT_EXISTING_USER_IN_TOKEN',
      );
    }

    if (user.role !== UserRole.ADMIN) {
      throw new ForbiddenException(
        '접근 권한이 없습니다.',
        'ONLY_USER_CAN_ACCESS',
      );
    }

    return user;
  }
}
