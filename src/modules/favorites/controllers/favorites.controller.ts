import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { IdDto } from 'src/modules/id.dto';
import { FavoritesRepsonse } from 'src/types';
import { FavoritesService } from '../services/favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favsService: FavoritesService) {}

  @Get()
  async getAll(): Promise<FavoritesRepsonse> {
    return await this.favsService.all();
  }

  @Post('track/:id')
  async addTrack(@Param() params: IdDto): Promise<string> {
    return await this.favsService.addTrack(params.id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  async deleteTrack(@Param() params: IdDto): Promise<void> {
    return await this.favsService.deleteTrack(params.id);
  }

  @Post('album/:id')
  async addAlbum(@Param() params: IdDto): Promise<string> {
    return await this.favsService.addAlbum(params.id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async deleteAlbum(@Param() params: IdDto): Promise<void> {
    return await this.favsService.deleteAlbum(params.id);
  }

  @Post('artist/:id')
  async addArtist(@Param() params: IdDto): Promise<string> {
    return await this.favsService.addArtist(params.id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async deleteArtist(@Param() params: IdDto): Promise<void> {
    return await this.favsService.deleteArtist(params.id);
  }
}
