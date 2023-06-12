import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { SignupUserRequestDto } from './dto/signupUser.request.dto';
import { UserRole } from './userRole';
import { SigninUserRequestDto } from './dto/signinUser.request.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupUserRequestDto: SignupUserRequestDto) {
    const { email, password } = signupUserRequestDto;

    const user = new User();

    user.email = email;
    user.password = password;
    user.role = UserRole.NORMAL;

    return await this.userRepository.save(user);
  }

  async signin(signinUserRequestDto: SigninUserRequestDto) {
    const { email, password } = signinUserRequestDto;
    const user = await this.userRepository.findOne({
      where: { email, password, role: UserRole.NORMAL },
    });

    if (!user) {
      throw new NotFoundException('없는 사용자입니다');
    }

    const accessToken = this.jwtService.sign({
      userId: user.id,
    });
    return {
      accessToken,
    };
  }
}
