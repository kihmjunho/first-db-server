import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/appConfig.module';
import { DatabaseModule } from './config/database.module';
import { BoardModule } from './board/board.module';
import { UserModule } from './user/user.module';
import { JwtAuthModule } from './config/jwt/jwtAuth.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    BoardModule,
    UserModule,
    JwtAuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
