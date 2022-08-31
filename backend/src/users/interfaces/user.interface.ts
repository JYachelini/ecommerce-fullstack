import { Document, ObjectId } from 'mongoose';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export interface User extends Document {
  readonly name: string;
  readonly username: string;
  readonly password: string;
  roles: UserRole[];
  readonly phone: string;
  readonly address: string;
  email: string;
  readonly error?: string;
  readonly hashRT: string | null;
}

export interface UserInterface {
  _id?: ObjectId;
  readonly name?: string;
  username?: string;
  roles?: UserRole[];
  readonly phone?: string;
  readonly address?: string;
  email?: string;
  readonly error?: string;
  readonly hashRT?: string | null;
}

export interface RequestUser {
  readonly _id: string;
  readonly name: string;
  readonly username: string;
  readonly password: string;
  roles: UserRole;
  readonly phone: string;
  readonly address: string;
  email: string;
  readonly error?: string;
  readonly refresh_token?: string | null;
}
