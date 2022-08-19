import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  find = async (Filter: FilterQuery<T>): Promise<T[] | null> => {
    try {
      return await this.entityModel.find(Filter).exec();
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
