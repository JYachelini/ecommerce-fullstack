import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';

import { ProductInterface } from './interfaces/products.interface';
import { CreateProductDTO, UpdateProductDTO } from './dto/products.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductsRepository) {}

  getProducts = async (
    filter,
    sort,
    pages,
    limitPages,
  ): Promise<ProductInterface[]> => {
    try {
      const products = await this.productRepository.find(
        filter,
        sort,
        pages,
        limitPages,
      );
      return products;
    } catch (error) {
      return error;
    }
  };

  getCategories = async (filter) => {
    try {
      const categories = await this.productRepository.getCategories(filter);
      return categories;
    } catch (error) {
      return error;
    }
  };

  getCountProducts = async (filter) => {
    try {
      const count = await this.productRepository.findAndCount(filter);
      return count;
    } catch (error) {
      return error;
    }
  };

  getProduct = async (id: ObjectId): Promise<ProductInterface> => {
    try {
      const product = await this.productRepository.findById(id);
      return product;
    } catch (error) {
      return error;
    }
  };

  getProductStock = async (id: ObjectId): Promise<ProductInterface> => {
    try {
      const product = await this.productRepository.findById(id, {
        name: 0,
        description: 0,
        imageURL: 0,
        price: 0,
        category: 0,
        subcategory: 0,
        _id: 0,
      });
      return product;
    } catch (error) {
      return error;
    }
  };

  restProductStock = async (_id: ObjectId, quantity: number) => {
    try {
      const { stock } = await this.getProductStock(_id);
      await this.updateProduct(_id, { stock: stock - quantity });
    } catch (error) {
      return error;
    }
  };

  createProduct = async (
    createProductDTO: CreateProductDTO,
  ): Promise<ProductInterface> => {
    try {
      const newProduct = this.productRepository.createEntity(createProductDTO);
      return newProduct;
    } catch (error) {
      return error;
    }
  };

  updateProduct = async (
    id: ObjectId,
    updateProductDTO: UpdateProductDTO,
  ): Promise<ProductInterface> => {
    try {
      const updatedProduct = this.productRepository.updateObject(
        id,
        updateProductDTO,
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
