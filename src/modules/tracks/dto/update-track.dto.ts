import { IsString } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  name?: string;

  @IsString()
  duration?: number;

  @IsString()
  artistId?: string;

  @IsString()
  albumId?: string;
}
