import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Product } from './interfaces/products.interface';
import { CreateProductDTO } from './dto/products.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductsRepository) {}

  getProducts = async (): Promise<Product[]> => {
    try {
      const products = await this.productRepository.find({});
      return products;
    } catch (error) {
      return error;
    }
  };

  getProduct = async (id: ObjectId): Promise<Product> => {
    try {
      const product = await this.productRepository.findById(id);
      return product;
    } catch (error) {
      return error;
    }
  };

  createProduct = async (
    createProductDTO: CreateProductDTO,
  ): Promise<Product> => {
    try {
      const newProduct = this.productRepository.createEntity(createProductDTO);
      return newProduct;
    } catch (error) {
      return error;
    }
  };

  updateProduct = async (
    id: ObjectId,
    createProductDTO: CreateProductDTO,
  ): Promise<Product> => {
    try {
      const updatedProduct = this.productRepository.updateObject(
        id,
        createProductDTO,
      );
      return updatedProduct;
    } catch (error) {
      return error;
    }
  };

  deleteProduct = async (id: ObjectId): Promise<boolean> => {
    try {
      const deletedProduct = this.productRepository.deleteObject(id);
      return deletedProduct;
    } catch (error) {
      return error;
    }
  };
}
