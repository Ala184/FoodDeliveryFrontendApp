import { Product } from "./product.model";
import { User } from "./user.model";

export class Order{
    id: number = -1;
    userId = 0;
    address = "";
    comment = "";
    totalPrice = "";
    deliveryTime = "";
    createdAt = "";
    delivered: number = 0;
    delivererId: number = 0;
    user: User = new User;
    products: Product[] = [];
}