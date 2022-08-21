import { Document } from 'mongoose';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export interface User extends Document {
  readonly name: string;
  readonly username: string;
  readonly password: string;
  roles: UserRole;
  readonly avatar: string;
  readonly phone: string;
  readonly address: string;
  email: string;
  readonly error?: string;
}
