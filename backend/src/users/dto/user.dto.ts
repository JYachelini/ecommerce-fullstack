import {
  IsString,
  MinLength,
  IsEmail,
  Length,
  IsOptional,
  IsEnum,
  Matches,
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
  @Matches(
    /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,32}/,
  )
  password: string;

  @IsString()
  @Length(6, 32)
  confirmPassword: string;

  @IsString()
  @MinLength(3)
  @Matches(/^\+[1-9]\d{6,14}$/)
  phone: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  hashRT: string;
}

export class UpdateUserDTO {
  @IsString()
  @MinLength(3)
  @IsOptional()
  name: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  username: string;

  @IsEmail()
  @IsOptional()
  email: string;

  // @IsString()
  // @Length(6, 32)
  // @Matches(
  //   /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,32}/,
  // )
  // password: string;

  @IsString()
  @MinLength(3)
  @Matches(/^\+[1-9]\d{6,14}$/)
  @IsOptional()
  phone: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  address: string;
}
