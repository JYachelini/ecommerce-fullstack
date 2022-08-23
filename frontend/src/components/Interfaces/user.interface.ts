export interface UserInterfaceRegister {
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  address?: string;
  password?: string;
  confirmPassword?: string;
}

export interface UserInterface {
  _id?: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  address?: string;
}
