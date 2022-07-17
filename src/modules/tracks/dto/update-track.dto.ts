import { IsOptional, IsString } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  duration?: number;

  @IsString()
  @IsOptional()
  artistId?: string;

  @IsString()
  @IsOptional()
  albumId?: string;
}
