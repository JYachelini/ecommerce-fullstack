import { Injectable } from '@nestjs/common';
import { Error, Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Product } from './interfaces/products.interface';
import { CreateProductDTO } from './dto/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  getProducts = async (): Promise<Product[]> => {
    try {
      const products = await this.productModel.find();
      return products;
    } catch (error) {
      return error;
    }
  };

  getProduct = async (id: ObjectId): Promise<Product> => {
    try {
      const product = await this.productModel.findById(id);
      return product;
    } catch (error) {
      return error;
    }
  };

  createProduct = async (
    createProductDTO: CreateProductDTO,
  ): Promise<Product> => {
    try {
      const newProduct = new this.productModel(createProductDTO);
      return await newProduct.save();
    } catch (error) {
      return error;
    }
  };

  updateProduct = async (
    id: ObjectId,
    createProductDTO: CreateProductDTO,
  ): Promise<Product> => {
    try {
      const updatedProduct = await this.productModel.findByIdAndUpdate(
        id,
        createProductDTO,
        { new: true },
      );
      return updatedProduct;
    } catch (error) {
      return error;
    }
  };

  deleteProduct = async (id: ObjectId): Promise<Product> => {
    try {
      const deletedProduct = await this.productModel.findByIdAndDelete(id);
      return deletedProduct;
    } catch (error) {
      return error;
    }
  };
}
