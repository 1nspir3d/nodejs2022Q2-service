import { Module } from '@nestjs/common';
import { ArtistsModule } from './modules/artists/artists.module';
import { TracksModule } from './modules/tracks/tracks.module';
import { UsersModule } from './modules/users/users.module';
@Module({
  imports: [UsersModule, TracksModule, ArtistsModule],
})
export class AppModule {}
