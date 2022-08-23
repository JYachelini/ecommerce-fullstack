import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { async } from 'rxjs';
import { CreateUserDTO } from './dto/user.dto';
import { User } from './interfaces/user.interface';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  getUsers = async (filter, sort, pages, limitPages) => {
    return await this.userRepository.find(filter, sort, pages, limitPages);
  };

  countUsers = async (filter) => {
    return await this.userRepository.findAndCount(filter);
  };

  findUser = async (username: string) => {
    return await this.userRepository.findOne({ username });
  };

  findUserById = async (_id: string) => {
    return await this.userRepository.findById({ _id }, { password: 0 });
  };

  register = async (user: CreateUserDTO) => {
    return await this.userRepository.register(user);
  };

  updateUser = async (id: ObjectId, user: User) => {
    delete user.roles;
    delete user._id;
    delete user.email;
    return await this.userRepository.updateObject(id, user);
  };
}
