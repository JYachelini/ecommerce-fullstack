import {
  ArrayNotEmpty,
  IsArray,
  IsMongoId,
  ValidateNested,
  ArrayMinSize,
  IsString,
  MinLength,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ObjectId } from 'mongoose';

export class CreateCartDTO {
  @IsMongoId()
  userId: ObjectId;

  @IsString()
  userAddress: string;

  @IsString()
  userPhone: string;

  @IsString()
  userName: string;

  @IsString()
  userEmail: string;

  @IsString()
  userUsername: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProductDTO)
  products: ProductDTO[];

  @IsNumber()
  @Min(1)
  totalPrice: number;

  @IsNumber()
  @Min(1)
  totalQuantity: number;
}

export class ProductDTO {
  @IsMongoId()
  _id?: ObjectId;

  @IsString()
  @MinLength(3)
  name?: string;

  @IsString()
  @MinLength(3)
  description?: string;

  @IsString()
  imageURL?: string;

  @IsString()
  @MinLength(3)
  category?: string;

  @IsString()
  @MinLength(3)
  subcategory?: string;

  @IsNumber()
  @Min(1)
  price?: number;

  @IsNumber()
  @Min(1)
  quantity?: number;
}
