import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { MailService } from '../mail/mail.service';
import { ProductsService } from '../products/products.service';
import { UserInterface } from '../users/interfaces/user.interface';
import { CartRepository } from './cart.repository';
import { CreateCartDTO, ProductDTO } from './dto/cart.dto';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly productsService: ProductsService,
    private readonly mailService: MailService,
    private readonly usersService: UsersService,
  ) {}

  getOrders = async (filter, sort, pages, limitPages) => {
    try {
      const orders = await this.cartRepository.find(
        filter,
        sort,
        pages,
        limitPages,
      );
      const count = await this.cartRepository.findAndCount(filter);
      return { orders, count };
    } catch (error) {
      return error;
    }
  };

  createOrder = async (cart: CreateCartDTO, user: UserInterface) => {
    const productsInCart = new Set(cart.products);

    const checkStock = await this.checkStock(productsInCart); // Check if products in cart has stock available

    if (checkStock.length > 0) {
      return { errors: checkStock };
    } else {
      const cartCreated = await this.cartRepository.createEntity(cart);
      await this.removeStock(productsInCart);
      const mailSent = await this.mailService.orderConfirmed(cartCreated, user); // Send email
      await this.usersService.updateUser(user._id, {
        address: cart.userAddress,
        phone: cart.userPhone,
        email: cart.userEmail,
        name: cart.userName,
      });
      return {
        message: 'Order generated Succesfully!',
        _id: cartCreated._id,
        mailSent,
      };
    }
  };

  checkStock = async (products: Set<ProductDTO>) => {
    const result = [];
    for (const product of products) {
      const productToCheck = await this.productsService.getProductStock(
        product._id,
      );
      if (product.quantity > productToCheck.stock) {
        result.push({
          _id: product._id,
          error: `${product.name} have no stock enough for purchase.`,
        });
      }
    }
    return result;
  };

  removeStock = async (products: Set<ProductDTO>) => {
    for (const product of products) {
      await this.productsService.restProductStock(
        product._id,
        product.quantity,
      );
    }
  };
}
