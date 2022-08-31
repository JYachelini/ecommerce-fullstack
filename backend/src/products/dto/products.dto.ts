import {
  IsString,
  MinLength,
  IsNumber,
  Min,
  IsOptional,
  IsMongoId,
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

  @IsString()
  @MinLength(3)
  category: string;

  @IsString()
  @MinLength(3)
  subcategory: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  stock: number;
}

export class UpdateProductDTO {
  @IsString()
  @MinLength(3)
  @IsOptional()
  name?: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  imageURL?: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  category?: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  subcategory?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  stock?: number;
}
