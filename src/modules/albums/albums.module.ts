import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsController } from './controllers/albums.controller';
import { AlbumEntity } from './entities/album.entity';
import { AlbumsService } from './services/albums.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([AlbumEntity]),
  ],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
})
export class AlbumsModule {}
