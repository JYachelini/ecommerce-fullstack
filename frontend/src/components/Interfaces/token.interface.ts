export interface DecodedToken {
  exp: number;
  iat: number;
  _id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  address?: string;
  role: string;
}
