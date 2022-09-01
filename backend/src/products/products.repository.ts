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
  constructor(
    @InjectModel(Product.name) productModel: Model<ProductInterface>,
  ) {
    super(productModel);
  }

  getCategories = async (Filter: FilterQuery<ProductDocument>) => {
    // Filter of categorys and save objects with category and their subcategories, all in one.
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
            ); // Return the index of category existent on filteredCategories

            if (categoryFound >= 0) {
              // If category is found on filteredCategories
              if (
                !filteredCategories[categoryFound].subcategories.includes(
                  subcategoryToPush,
                )
              ) {
                // If subcategory of category found in filteredCategories doesen't exist
                filteredCategories[categoryFound].subcategories.push(
                  subcategoryToPush,
                );
              }
            } else {
              // If filteredCategories not have the current category, it will push
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
