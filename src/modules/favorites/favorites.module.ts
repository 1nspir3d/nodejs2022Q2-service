import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsModule } from '../albums/albums.module';
import { ArtistsModule } from '../artists/artists.module';
import { TracksModule } from '../tracks/tracks.module';
import { FavoritesController } from './controllers/favorites.controller';
import { FavoritesEntity } from './entities/favorites.entity';
import { FavoritesService } from './services/favorites.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoritesEntity]),
    AlbumsModule,
    ArtistsModule,
    TracksModule,
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
