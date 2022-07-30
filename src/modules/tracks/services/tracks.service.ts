import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from 'src/types';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { TrackEntity } from '../entities/track.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackEntity)
    private tracksRepository: Repository<TrackEntity>,
  ) {}

  async all(): Promise<Track[]> {
    return await this.tracksRepository.find();
  }

  async get(id: string): Promise<Track> {
    const track = await this.tracksRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!track) {
      throw new HttpException("Track with such id doesn't exist", 404);
    }

    return track;
  }

  async create(payload: CreateTrackDto): Promise<Track> {
    const createdTrack = this.tracksRepository.create({
      ...payload,
      id: v4(),
    });

    return await this.tracksRepository.save(createdTrack);
  }

  async update(id: string, payload: UpdateTrackDto): Promise<Track> {
    const track = await this.get(id);

    Object.assign(track, payload);

    return await this.tracksRepository.save(track);
  }

  async delete(id: string): Promise<void> {
    const result = await this.tracksRepository.delete(id);
    console.log('result: ', result.affected);

    if (result.affected === 0) {
      throw new HttpException("Track with such id doesn't exist", 404);
    }
  }

  async removeAlbumId(id: string): Promise<void> {
    const track = await this.tracksRepository.findOne({
      where: {
        albumId: id,
      },
    });

    if (track) {
      Object.assign(track, { albumId: null });
      await this.tracksRepository.save(track);
    }
  }
}
