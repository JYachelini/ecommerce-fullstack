import { forwardRef, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CreateUserDTO } from './dto/user.dto';
import { UserInterface } from './interfaces/user.interface';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => UsersRepository))
    private readonly userRepository: UsersRepository,
  ) {}

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

  findEmail = async (email: string) => {
    return await this.userRepository.findOne({ email });
  };

  register = async (user: CreateUserDTO) => {
    return await this.userRepository.register(user);
  };

  updateUser = async (id: ObjectId, user: UserInterface) => {
    const userFound = await this.findUser(user.username);
    if (userFound)
      return { statusCode: HttpStatus.FOUND, message: 'Username exist.' };

    const emailFound = await this.findEmail(user.email);
    if (emailFound)
      return { statusCode: HttpStatus.FOUND, message: 'Email exist.' };

    delete user.roles;
    delete user._id;

    const userUpdated = await this.userRepository.updateObject(id, user);

    return {
      statusCode: HttpStatus.OK,
      message: 'User Updated Succesfully.',
    };
  };
}
