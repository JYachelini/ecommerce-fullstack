export interface Author {
  id: string;
  username: string;
}

export interface IChat {
  author: Author;
  message: string;
}
