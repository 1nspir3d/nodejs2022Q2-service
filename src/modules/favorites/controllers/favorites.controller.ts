import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IdDto } from 'src/modules/id.dto';
import { FavoritesRepsonse } from 'src/types';
import { FavoritesService } from '../services/favorites.service';

@Controller('favs')
@UseGuards(AuthGuard('jwt'))
export class FavoritesController {
  constructor(private readonly favsService: FavoritesService) {}

  @Get()
  async getAll(): Promise<FavoritesRepsonse> {
    return await this.favsService.all();
  }

  @Post('track/:id')
  async addTrack(@Param() params: IdDto): Promise<string> {
    return await this.favsService.add(params.id, 'track');
  }

  @Delete('track/:id')
  @HttpCode(204)
  async deleteTrack(@Param() params: IdDto): Promise<void> {
    return await this.favsService.delete(params.id, 'track');
  }

  @Post('album/:id')
  async addAlbum(@Param() params: IdDto): Promise<string> {
    return await this.favsService.add(params.id, 'album');
  }

  @Delete('album/:id')
  @HttpCode(204)
  async deleteAlbum(@Param() params: IdDto): Promise<void> {
    return await this.favsService.delete(params.id, 'album');
  }

  @Post('artist/:id')
  async addArtist(@Param() params: IdDto): Promise<string> {
    return await this.favsService.add(params.id, 'artist');
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async deleteArtist(@Param() params: IdDto): Promise<void> {
    return await this.favsService.delete(params.id, 'artist');
  }
}
