import { IsNotEmpty, IsUUID } from 'class-validator';

export class IdDto {
  @IsUUID('4')
  @IsNotEmpty()
  id: string;
}
