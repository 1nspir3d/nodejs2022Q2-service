import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { ArtistsController } from './controllers/artists.controller';
import { ArtistsService } from './services/artists.service';

@Module({
  imports: [DbModule],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
