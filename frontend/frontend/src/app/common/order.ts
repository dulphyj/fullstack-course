import { OrderProduct } from "./order-product";
import { OrderState } from "./order-state";

export class Order {
    constructor(
        public id: number|null,
        public dateCreated: Date,
        public orderProduct: OrderProduct[],
        public userId: number,
        //public totalPrice: number,
        public orderState: OrderState,
    ){}

    getTotal(){
        let total = 0;
        this.orderProduct.forEach(element => {
            total += element.price * element.quantity;
            console.log('total: ' + total);
        });
        //return total;
    }
}
