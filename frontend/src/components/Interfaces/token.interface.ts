export interface DecodedToken {
  user: {
    _id: string;
    name: string;
    username: string;
    email: string;
    phone: string;
    role: string;
  };
}
