import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { EntityRepository } from 'src/db/entity.repository';
import { CreateUserDTO } from './dto/user.dto';
import { User } from './interfaces/user.interface';
import { UserDocument } from './schemas/user.schema';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersRepository extends EntityRepository<UserDocument> {
  constructor(
    @InjectModel('User') userModel: Model<User>,
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
  ) {
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
        const hashedPassword = await this.authService.hashData(password);
        const newUserRegistered = await this.createEntity({
          name,
          username,
          password: hashedPassword,
          email,
          phone,
          address,
        });
        const tokens = await this.authService.getTokens({
          _id: newUserRegistered._id,
          name,
          username,
          email,
          phone,
          address,
          roles: newUserRegistered.roles,
        });
        await this.updateRefreshTokenHash(
          newUserRegistered._id,
          tokens.refresh_token,
        );
        return {
          _id: newUserRegistered._id,
          tokens,
        };
      }
    }
  };

  updateRefreshTokenHash = async (_id: ObjectId, refresh_token: string) => {
    const refresh_tokenHashed = await this.authService.hashData(refresh_token);
    await this.updateObject(_id, { hashRT: refresh_tokenHashed });
  };
}
