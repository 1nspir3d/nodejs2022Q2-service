import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from 'src/types';
import { Repository } from 'typeorm';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { ArtistEntity } from '../entities/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistsRepository: Repository<ArtistEntity>,
  ) {}

  async all(): Promise<Artist[]> {
    return await this.artistsRepository.find();
  }

  async get(id: string): Promise<Artist> {
    const artist = await this.artistsRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!artist) {
      throw new HttpException("Artist with such id doesn't exist", 404);
    }

    return artist;
  }

  async create(payload: CreateArtistDto): Promise<Artist> {
    const createdArtist = this.artistsRepository.create(payload);

    return this.artistsRepository.save(createdArtist);
  }

  async update(id: string, payload: UpdateArtistDto): Promise<Artist> {
    const artist = await this.get(id);

    Object.assign(artist, payload);

    return await this.artistsRepository.save(artist);
  }

  async delete(id: string): Promise<void> {
    const result = await this.artistsRepository.delete(id);

    if (result.affected === 0) {
      throw new HttpException("Artist with such id doesn't exist", 404);
    }
  }
}
