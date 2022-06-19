import { IsUUID } from 'class-validator';

export class FindOneParamsDto {
  @IsUUID()
  readonly id: string;
}
