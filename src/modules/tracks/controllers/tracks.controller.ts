import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IdDto } from 'src/modules/id.dto';
import { Track } from 'src/types';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { TracksService } from '../services/tracks.service';

@Controller('track')
@UseGuards(AuthGuard('jwt'))
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  async getTracks(): Promise<Track[]> {
    return await this.tracksService.all();
  }

  @Get(':id')
  async getTrack(@Param() params: IdDto): Promise<Track> {
    return await this.tracksService.get(params.id);
  }

  @Post()
  async createTrack(@Body() body: CreateTrackDto): Promise<Track> {
    return await this.tracksService.create(body);
  }

  @Put(':id')
  async updateTrack(
    @Param() params: IdDto,
    @Body() body: UpdateTrackDto,
  ): Promise<Track> {
    return await this.tracksService.update(params.id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTrack(@Param() params: IdDto): Promise<void> {
    return await this.tracksService.delete(params.id);
  }
}
