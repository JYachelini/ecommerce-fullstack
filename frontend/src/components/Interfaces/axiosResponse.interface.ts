import { CartInterfaceDB } from './cart.interface';
import { categories, ProductInterface } from './products.interface';
import { UserInterface } from './user.interface';

export interface axiosResponseProducts {
  data: {
    products: ProductInterface[];
    actual_page: number;
    total_items: number;
    last_page: number;
  };
}

export interface axiosResponseCategories {
  data: {
    categories: categories[];
  };
}

export interface axiosResponseRegisterError {
  response: {
    data: {
      error: string;
    };
  };
}

export interface axiosResponseRegisterSuccess {
  data: {
    _id: string;
    access_token: string;
    refresh_token: string;
  };
}

export interface axiosResponseLoginError {
  response: {
    data: {
      error: string;
    };
  };
}

export interface axiosResponseLoginSuccess {
  data: {
    access_token: string;
    refresh_token: string;
  };
}

export interface axiosResponseAdminUsersSuccess {
  data: axiosDataResponseAdminUsersSuccess;
}

export interface axiosDataResponseAdminUsersSuccess {
  actual_page: number;
  last_page: number;
  total_items: number;
  users: UserInterface[];
}

export interface axiosRefresh {
  data: {
    access_token: string;
    refresh_token: string;
  };
}

export interface axiosOrders {
  data: {
    actual_page: number;
    last_page: number;
    total_items: number;
    orders: CartInterfaceDB[];
  };
}
