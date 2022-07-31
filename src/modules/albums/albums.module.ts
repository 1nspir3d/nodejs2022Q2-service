import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { AlbumsController } from './controllers/albums.controller';
import { AlbumsService } from './services/albums.service';

@Module({
  imports: [DbModule],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
})
export class AlbumsModule {}
