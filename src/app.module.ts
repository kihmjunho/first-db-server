import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/appConfig.module';
import { DatabaseModule } from './config/database.module';
import { BoardModule } from './board/board.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AppConfigModule, DatabaseModule, BoardModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
