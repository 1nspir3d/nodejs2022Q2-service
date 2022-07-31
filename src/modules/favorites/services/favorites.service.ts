import { Injectable } from '@nestjs/common';
import { DbService } from 'src/modules/db/services/db.service';
import { FavoritesRepsonse } from 'src/types';

@Injectable()
export class FavoritesService {
  constructor(private readonly dbService: DbService) {}

  async all(): Promise<FavoritesRepsonse> {
    return this.dbService.getFavorites();
  }

  async addTrack(id: string): Promise<string> {
    return this.dbService.addTrackToFavs(id);
  }

  async deleteTrack(id: string): Promise<void> {
    this.dbService.deleteTrackFromFavs(id);
  }

  async addAlbum(id: string): Promise<string> {
    return this.dbService.addAlbumToFavs(id);
  }

  async deleteAlbum(id: string): Promise<void> {
    this.dbService.deleteAlbumFromFavs(id);
  }

  async addArtist(id: string): Promise<string> {
    return this.dbService.addArtistToFavs(id);
  }

  async deleteArtist(id: string): Promise<void> {
    this.dbService.deleteArtistFromFavs(id);
  }
}
