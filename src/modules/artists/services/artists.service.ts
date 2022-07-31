import { Injectable } from '@nestjs/common';
import { DbService } from 'src/modules/db/services/db.service';
import { Artist } from 'src/types';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(private readonly dbService: DbService) {}

  async all(): Promise<Artist[]> {
    return this.dbService.getArtists();
  }

  async get(id: string): Promise<Artist> {
    return this.dbService.getArtist(id);
  }

  async create(payload: CreateArtistDto): Promise<Artist> {
    return this.dbService.createArtist(payload);
  }

  async update(id: string, payload: UpdateArtistDto): Promise<Artist> {
    return this.dbService.updateArtist(id, payload);
  }

  async delete(id: string): Promise<void> {
    return this.dbService.deleteArtist(id);
  }
}
