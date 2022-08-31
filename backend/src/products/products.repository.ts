import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { EntityRepository } from '../db/entity.repository';
import { ProductInterface } from './interfaces/products.interface';
import { Product, ProductDocument } from './schemas/products.schema';

interface categories {
  category: string;
  subcategory: string;
}

interface filteredCategories {
  category: string;
  subcategories: string[];
}

@Injectable()
export class ProductsRepository extends EntityRepository<ProductDocument> {
  // Injecto el modelo del producto
  constructor(
    @InjectModel(Product.name) productModel: Model<ProductInterface>,
  ) {
    super(productModel);
  }

  getCategories = async (Filter: FilterQuery<ProductDocument>) => {
    try {
      const categories = await this.entityModel
        .find(Filter, {
          category: 1,
          subcategory: 1,
          _id: 0,
        })
        .then((categories) => {
          const filteredCategories: filteredCategories[] = [];

          categories.forEach((element: categories) => {
            const categoryToPush = element.category;
            const subcategoryToPush = element.subcategory;

            const categoryFound = filteredCategories.findIndex(
              (c) => c.category === categoryToPush,
            );

            if (categoryFound >= 0) {
              if (
                !filteredCategories[categoryFound].subcategories.includes(
                  subcategoryToPush,
                )
              ) {
                filteredCategories[categoryFound].subcategories.push(
                  subcategoryToPush,
                );
              }
            } else {
              filteredCategories.push({
                category: categoryToPush,
                subcategories: [subcategoryToPush],
              });
            }
          });
          return filteredCategories;
        });

      return { categories };
    } catch (error) {
      return error;
    }
  };
}
