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
import { Artist } from 'src/types';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { ArtistsService } from '../services/artists.service';

@Controller('artist')
@UseGuards(AuthGuard('jwt'))
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  async getTracks(): Promise<Artist[]> {
    return await this.artistsService.all();
  }

  @Get(':id')
  async getTrack(@Param() params: IdDto): Promise<Artist> {
    return await this.artistsService.get(params.id);
  }

  @Post()
  async createTrack(@Body() body: CreateArtistDto): Promise<Artist> {
    return await this.artistsService.create(body);
  }

  @Put(':id')
  async updateTrack(
    @Param() params: IdDto,
    @Body() body: UpdateArtistDto,
  ): Promise<Artist> {
    return await this.artistsService.update(params.id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTrack(@Param() params: IdDto): Promise<void> {
    return await this.artistsService.delete(params.id);
  }
}
