import { Injectable } from '@nestjs/common';
import { DbService } from 'src/modules/db/services/db.service';
import { Album } from 'src/types';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';

@Injectable()
export class AlbumsService {
  constructor(private readonly dbService: DbService) {}

  async all(): Promise<Album[]> {
    return this.dbService.getAlbums();
  }

  async get(id: string): Promise<Album> {
    return this.dbService.getAlbum(id);
  }

  async create(payload: CreateAlbumDto): Promise<Album> {
    return this.dbService.createAlbum(payload);
  }

  async update(id: string, payload: UpdateAlbumDto): Promise<Album> {
    return this.dbService.updateAlbum(id, payload);
  }

  async delete(id: string): Promise<void> {
    return this.dbService.deleteAlbum(id);
  }
}
