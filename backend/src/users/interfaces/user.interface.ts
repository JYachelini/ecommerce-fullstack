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
  readonly phone: string;
  readonly address: string;
  email: string;
  readonly error?: string;
}

export interface RequestUser {
  user: {
    readonly _id: string;
    readonly name: string;
    readonly username: string;
    readonly password: string;
    roles: UserRole;
    readonly phone: string;
    readonly address: string;
    email: string;
    readonly error?: string;
  };
}
