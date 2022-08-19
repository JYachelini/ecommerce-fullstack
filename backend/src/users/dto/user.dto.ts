import {
  IsString,
  MinLength,
  IsEmail,
  Length,
  IsOptional,
  IsEnum,
} from 'class-validator';

import { UserRole } from '../interfaces/user.interface';

export class CreateUserDTO {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(3)
  username: string;

  @IsEmail()
  email: string;

  @IsEnum(UserRole)
  @IsOptional()
  role: string;

  @IsString()
  @Length(6, 32)
  password: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  avatar: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  phone: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  address: string;
}
