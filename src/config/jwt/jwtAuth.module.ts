import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../user/user.entity';

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'abcd',
      signOptions: { expiresIn: '60d' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [],
  providers: [JwtStrategy],
  exports: [JwtModule],
})
export class JwtAuthModule {}
