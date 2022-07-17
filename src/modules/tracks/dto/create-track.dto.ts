import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  duration: number;

  @IsString()
  artistId?: string;

  @IsString()
  albumId?: string;
}
