import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AlbumsModule } from './modules/albums/albums.module';
import { ArtistsModule } from './modules/artists/artists.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { TracksModule } from './modules/tracks/tracks.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import configOptions from './ormconfig';
import { LoggerMiddleware } from './core/logger.middleware';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './core/http-exception.filter';
import { AuthModule } from './modules/auth/auth.module';
@Module({
  imports: [
    UsersModule,
    TracksModule,
    ArtistsModule,
    AlbumsModule,
    FavoritesModule,
    TypeOrmModule.forRoot(configOptions),
    AuthModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
