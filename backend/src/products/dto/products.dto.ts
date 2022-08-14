export class CreateProductDTO {
  readonly name: string;
  readonly description: string;
  readonly imageURL: string;
  readonly price: number;
  readonly stock: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
