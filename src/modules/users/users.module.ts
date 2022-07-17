import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
@Module({
  imports: [DbModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
