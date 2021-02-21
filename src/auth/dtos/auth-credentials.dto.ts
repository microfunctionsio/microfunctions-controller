import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
} from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(5)
  @MaxLength(40)
  email: string;

  @MinLength(8)
  @MaxLength(20)
  password: string;
}
