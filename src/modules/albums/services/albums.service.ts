import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from 'src/types';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { AlbumEntity } from '../entities/album.entity';
import { v4 } from 'uuid';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumsRepository: Repository<AlbumEntity>,
  ) {}

  async all(): Promise<Album[]> {
    return await this.albumsRepository.find();
  }

  async get(id: string): Promise<Album> {
    const result = await this.albumsRepository.findOne({
      where: {
        id: id,
      },
    });

    if (result) return result;

    throw new HttpException("Album with such id doesn't exist", 404);
  }

  async create(payload: CreateAlbumDto): Promise<Album> {
    const createdAlbum = this.albumsRepository.create({
      ...payload,
      id: v4(),
    });

    return await this.albumsRepository.save(createdAlbum);
  }

  async update(id: string, payload: UpdateAlbumDto): Promise<Album> {
    const album = await this.get(id);

    Object.assign(album, payload);

    return await this.albumsRepository.save(album);
  }

  async delete(id: string): Promise<void> {
    const result = await this.albumsRepository.delete(id);

    if (result.affected === 0) {
      throw new HttpException("Album with such id doesn't exist", 404);
    }
  }
}
