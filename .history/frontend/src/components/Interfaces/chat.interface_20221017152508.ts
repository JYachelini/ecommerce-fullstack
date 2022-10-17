export interface Author {
  id: string;
  username: string;
}

export interface Chat {
  author: Author;
  message: string;
}
