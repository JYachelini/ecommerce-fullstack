import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/db/entity.repository';
import { CreateUserDTO } from './dto/user.dto';
import { User } from './interfaces/user.interface';
import { UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository extends EntityRepository<UserDocument> {
  constructor(@InjectModel('User') userModel: Model<User>) {
    super(userModel);
  }

  register = async (user: CreateUserDTO) => {
    const { username, password, email, address, avatar, name, phone } = user;

    const emailFound = await this.findOne({ email })
      .catch((err) => {
        throw err;
      })
      .then((doc) => {
        return doc ? true : false;
      });

    const userFound = await this.findOne({ username })
      .catch((err) => {
        throw err;
      })
      .then((doc) => {
        return doc ? true : false;
      });

    if (emailFound) {
      return { error: 'Mail already exist.' };
    } else {
      if (userFound) {
        return { error: 'User already exist.' };
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        return await this.createEntity({
          name,
          username,
          password: hashedPassword,
          email,
          phone,
          avatar,
          address,
        });
      }
    }
  };
}
