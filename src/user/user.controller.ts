import { Body, Controller, Post } from '@nestjs/common';
import { SignupUserRequestDto } from './dto/signupUser.request.dto';
import { UserService } from './user.service';
import { SigninUserRequestDto } from './dto/signinUser.request.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() signupUserRequestDto: SignupUserRequestDto) {
    return await this.userService.signup(signupUserRequestDto);
  }

  @Post('signin')
  async signin(@Body() signinUserRequestDto: SigninUserRequestDto) {
    return await this.userService.signin(signinUserRequestDto);
  }
}
