import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { SignupUserRequestDto } from './dto/signupUser.request.dto';
import { UserRole } from './userRole';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signup(signupUserRequestDto: SignupUserRequestDto) {
    const { email, password } = signupUserRequestDto;

    const user = new User();

    user.email = email;
    user.password = password;
    user.role = UserRole.NORMAL;

    return await this.userRepository.save(user);
  }
}
