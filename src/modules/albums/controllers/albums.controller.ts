import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IdDto } from 'src/modules/id.dto';
import { Album } from 'src/types';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { AlbumsService } from '../services/albums.service';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  async getTracks(): Promise<Album[]> {
    return await this.albumsService.all();
  }

  @Get(':id')
  async getTrack(@Param() params: IdDto): Promise<Album> {
    return await this.albumsService.get(params.id);
  }

  @Post()
  async createTrack(@Body() body: CreateAlbumDto): Promise<Album> {
    return await this.albumsService.create(body);
  }

  @Put(':id')
  async updateTrack(
    @Param() params: IdDto,
    @Body() body: UpdateAlbumDto,
  ): Promise<Album> {
    return await this.albumsService.update(params.id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTrack(@Param() params: IdDto): Promise<void> {
    return await this.albumsService.delete(params.id);
  }
}
