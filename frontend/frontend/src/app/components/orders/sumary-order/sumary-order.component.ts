import { Component, OnInit } from '@angular/core';
import { ItemCard } from '../../../common/item-cart';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { OrderProduct } from '../../../common/order-product';
import { Order } from '../../../common/order';
import { OrderState } from '../../../common/order-state';
import { OrderService } from '../../../services/order.service';
import { PaymentService } from '../../../services/payment.service';
import { DataPayment } from '../../../common/data-payment';
import { SessionStorageService } from '../../../services/session-storage.service';

@Component({
  selector: 'app-sumary-order',
  templateUrl: './sumary-order.component.html',
  styleUrl: './sumary-order.component.css'
})
export class SumaryOrderComponent implements OnInit {
  items: ItemCard[] =[];
  totalCart: number = 0;
  userName: string = '';
  lastName: string = '';
  email: string = '';
  address: string = '';
  orderProducts: OrderProduct[] =[];
  userId: number = 1;

  constructor(private cartService: CartService,
      private userService: UserService,
      private orderServive:OrderService,
      private paymentService: PaymentService,
      private sessionStorage: SessionStorageService
    ) { }

  ngOnInit(): void {
    this.items =this.cartService.convertToListFromMap();
    this.totalCart = this.cartService.totalCart();
    this.userId = this.sessionStorage.getItem('token').id;
    this.getUserById(this.userId);
    setTimeout(() => {//funcion para cerrar la secion de usuario despues de x tiempo
      this.sessionStorage.removeItem('token');
    }, 500000);
  }

  generateOrder(){
    this.items.forEach(item => {
      this.orderProducts.push(new OrderProduct(null, item.productId, item.quantity, item.price));
    });
    let order = new Order(null, new Date(), this.orderProducts, this.userId, OrderState.CANCELLED);
    this.orderServive.createOrder(order).subscribe(data => {
      console.log('orden creada'+ data.id);
      this.sessionStorage.setItem('order', data);
    });
    //redireccion paypal
    let urlPayment;
    let dataPayment = new DataPayment('paypal', this.totalCart.toString(), 'USD', 'compra');
    this.paymentService.getUrlPaypalPayment(dataPayment).subscribe(data => {
      urlPayment = data.url;
      console.log('url de pago'+ urlPayment);
      window.location.href = urlPayment;
    });
  }

  deleteItem(productId: number){
    this.cartService.deleteitemCard(productId);
    this.items = this.cartService.convertToListFromMap();
    this.totalCart = this.cartService.totalCart();
  }

  getUserById(id: number){
    this.userService.getUserById(id).subscribe(data => {
      this.userName = data.userName;
      this.lastName = data.lastName;
      this.email = data.email;
      this.address = data.address;
    });
  }
}
