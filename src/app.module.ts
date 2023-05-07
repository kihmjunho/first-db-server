import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/appConfig.module';
import { DatabaseModule } from './config/database.module';
import { BoardModule } from './board/board.module';

@Module({
  imports: [AppConfigModule, DatabaseModule, BoardModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
