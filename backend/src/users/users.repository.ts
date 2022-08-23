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
    const { username, confirmPassword, password, email, address, name, phone } =
      user;

    if (confirmPassword !== password)
      return { error: "Password's don't match" };

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
      return { error: 'Email already exist.' };
    } else {
      if (userFound) {
        return { error: 'User already exist.' };
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUserRegistered = await this.createEntity({
          name,
          username,
          password: hashedPassword,
          email,
          phone,
          address,
        });
        return {
          _id: newUserRegistered._id,
        };
      }
    }
  };
}
