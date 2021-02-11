import { IsAlphanumeric, IsNotEmpty } from 'class-validator';

export class NamespaceDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  name: string;
}
