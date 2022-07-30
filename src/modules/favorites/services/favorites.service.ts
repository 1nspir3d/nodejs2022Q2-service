import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumsService } from 'src/modules/albums/services/albums.service';
import { ArtistsService } from 'src/modules/artists/services/artists.service';
import { TracksService } from 'src/modules/tracks/services/tracks.service';
import { FavoritesRepsonse } from 'src/types';
import { Repository } from 'typeorm';
import { FavoritesEntity } from '../entities/favorites.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoritesEntity)
    private favoritesRepository: Repository<FavoritesEntity>,
    private artistsService: ArtistsService,
    private albumsService: AlbumsService,
    private tracksService: TracksService,
  ) {}

  private async createFavs() {
    const favsCollection = await this.favoritesRepository.find();

    if (favsCollection.length !== 0) {
      return favsCollection[0];
    }

    const createdFavs = this.favoritesRepository.create({
      artists: [],
      albums: [],
      tracks: [],
    });

    return await this.favoritesRepository.save(createdFavs);
  }

  async all(): Promise<FavoritesRepsonse> {
    const favs = await this.createFavs();

    const artists = await Promise.all(
      favs.artists.map(async (id) => {
        try {
          return await this.artistsService.get(id);
        } catch (error) {}
      }),
    );

    const albums = await Promise.all(
      favs.albums.map(async (id) => {
        try {
          return await this.albumsService.get(id);
        } catch (error) {}
      }),
    );

    const tracks = await Promise.all(
      favs.tracks.map(async (id) => {
        try {
          return await this.tracksService.get(id);
        } catch (error) {}
      }),
    );

    return {
      artists: artists.filter((item) => item !== null && item !== undefined),
      albums: albums.filter((item) => item !== null && item !== undefined),
      tracks: tracks.filter((item) => item !== null && item !== undefined),
    };
  }

  async add(id: string, entity: 'album' | 'artist' | 'track'): Promise<string> {
    const result = await this[`${entity}sService`].get(id).catch(() => {
      throw new HttpException(
        `${entity[0].toUpperCase()}${entity
          .slice(1)
          .toLowerCase()} with such id doesn't exist`,
        422,
      );
    });

    const favs = await this.createFavs();

    favs[`${entity}s`].push(result.id);
    await this.favoritesRepository.save(favs);
    return `${entity[0].toUpperCase()}${entity
      .slice(1)
      .toLowerCase()} has been successfully added to favorites`;
  }

  async delete(
    id: string,
    entity: 'album' | 'artist' | 'track',
  ): Promise<void> {
    const favs = await this.createFavs();

    const index = favs[`${entity}s`].findIndex((item) => item === id);
    if (index === -1) {
      throw new HttpException(
        `${entity[0].toUpperCase()}${entity
          .slice(1)
          .toLowerCase()} is not in favorites`,
        404,
      );
    }
    favs[`${entity}s`] = favs[`${entity}s`].filter((item) => item !== id);

    await this.favoritesRepository.save(favs);
  }
}
