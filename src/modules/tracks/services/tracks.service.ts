import { Injectable } from '@nestjs/common';
import { DbService } from 'src/modules/db/services/db.service';
import { Track } from 'src/types';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';

@Injectable()
export class TracksService {
  constructor(private readonly dbService: DbService) {}

  async all(): Promise<Track[]> {
    return this.dbService.getTracks();
  }

  async get(id: string): Promise<Track> {
    return this.dbService.getTrack(id);
  }

  async create(payload: CreateTrackDto): Promise<Track> {
    return this.dbService.createTrack(payload);
  }

  async update(id: string, payload: UpdateTrackDto): Promise<Track> {
    return this.dbService.updateTrack(id, payload);
  }

  async delete(id: string): Promise<void> {
    return this.dbService.deleteTrack(id);
  }
}
