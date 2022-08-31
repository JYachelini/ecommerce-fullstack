import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  find = async (
    Filter: FilterQuery<T>,
    Sort,
    pages: number,
    limitPages: number,
  ): Promise<T[] | null> => {
    try {
      return await this.entityModel
        .find(Filter, { __v: 0, password: 0 })
        .sort(Sort)
        .skip((pages - 1) * limitPages)
        .limit(limitPages)
        .exec();
    } catch (error) {
      return error;
    }
  };

  findAndCount = async (Filter: FilterQuery<T>) => {
    try {
      return await this.entityModel.countDocuments(Filter).exec();
    } catch (error) {
      return error;
    }
  };

  findById = async (
    Filter: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T | null> => {
    try {
      return await this.entityModel
        .findById(Filter, {
          __v: 0,
          ...projection,
        })
        .exec();
    } catch (error) {
      return error;
    }
  };

  findOne = async (
    Filter: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T | null> => {
    try {
      return await this.entityModel
        .findOne(Filter, {
          __v: 0,
          ...projection,
        })
        .exec();
    } catch (error) {
      return error;
    }
  };

  createEntity = async (createEntityData: unknown): Promise<T> => {
    try {
      const entity = new this.entityModel(createEntityData);
      return await entity.save();
    } catch (error) {
      return error;
    }
  };

  // createMany = async (createManyData: unknown): Promise<any> => {
  //   try {
  //     const test = await this.entityModel.insertMany(createManyData);
  //     console.log(test);
  //     return test;
  //   } catch (error) {
  //     return error;
  //   }
  // };

  updateObject = async (
    Filter: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
  ): Promise<T | null> => {
    try {
      return await this.entityModel.findByIdAndUpdate(
        Filter,
        updateEntityData,
        {
          new: true,
        },
      );
    } catch (error) {
      return error;
    }
  };
  findOneAndUpdate = async (
    Filter: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
  ): Promise<T | null> => {
    try {
      return await this.entityModel.findOneAndUpdate(Filter, updateEntityData, {
        new: true,
      });
    } catch (error) {
      return error;
    }
  };

  deleteObject = async (Filter: FilterQuery<T>): Promise<boolean> => {
    try {
      const deleteResult = await this.entityModel.findByIdAndDelete(Filter);
      if (deleteResult) return true;
      else return false;
    } catch (error) {
      return error;
    }
  };

  deleteObjects = async (Filter: FilterQuery<T>): Promise<boolean> => {
    try {
      const deleteResult = await this.entityModel.deleteMany(Filter);
      return deleteResult.deletedCount >= 1;
    } catch (error) {
      return error;
    }
  };
}
