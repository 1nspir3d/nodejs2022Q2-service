import { IsString } from 'class-validator';

export class UpdateArtistDto {
  @IsString()
  name?: string;

  @IsString()
  grammy?: boolean;
}
