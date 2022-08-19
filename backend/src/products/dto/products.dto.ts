import {
  IsString,
  MinLength,
  IsNumber,
  Min,
  IsOptional,
} from 'class-validator';

export class CreateProductDTO {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(3)
  description: string;

  @IsString()
  imageURL: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  stock: number;

  createdAt: Date;
  updatedAt: Date;
}
