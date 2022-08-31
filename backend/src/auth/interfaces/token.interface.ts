interface token {
  access_token: string;
  refresh_token: string;
}

interface tokenDecoded {
  _id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}
