import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { TracksController } from './controllers/tracks.controller';
import { TracksService } from './services/tracks.service';

@Module({
  imports: [DbModule],
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TracksService],
})
export class TracksModule {}
