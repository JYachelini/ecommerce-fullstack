import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ProductDTO } from 'src/cart/dto/cart.dto';
import { CartInterface } from 'src/cart/interfaces/cart.interface';
import { UserInterface } from 'src/users/interfaces/user.interface';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  orderConfirmed = async (cart: CartInterface, user: UserInterface) => {
    const products = cart.products.map(
      (product: ProductDTO) => `
            <div>
                <ul>
                    <li>Nombre: ${product.name}</li>
                    <li>Cantidad: ${product.quantity}</li>
                    <li>Subtotal: ${product.quantity * product.price}</li>
                </ul>
            </div>
        `,
    );
    const contentEmail = `
            <h1>Orden confirmada</h1>
            <h3>Información de la orden:</h3>
            <div>
                <p>ID de la orden: ${cart._id}</p>
                <p>Productos</p>
                ${products}
                <p>Total: ${cart.totalPrice}</p>
            </div>
        `;

    const mailInfo = await this.mailerService.sendMail({
      to: user.email,
      subject: `Orden confirmada (${cart._id}) - TheBrown`,
      html: contentEmail,
    });

    return mailInfo;
  };
}
