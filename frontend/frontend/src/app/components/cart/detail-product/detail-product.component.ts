import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { ItemCard } from '../../../common/item-cart';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../../../services/home.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.css'
})
export class DetailProductComponent implements OnInit {
  id: number =  0;
  name:string = '';
  description: string = '';
  price: number = 0;
  urlImage: string = '';
  quantity: number = 0;
  ngOnInit(): void {
    this.getProductById();
  }

  constructor(private homeService: HomeService, private activatedRoute: ActivatedRoute, private cartService: CartService, private toastr:ToastrService) { }

  getProductById(){
    this.activatedRoute.params.subscribe(param => {
      let id = param['id'];
      if(id){
        this.homeService.getProductById(id).subscribe(data => {
          this.id = data.id;
          this.name = data.name;
          this.description = data.description;
          this.price = data.price;
          this.urlImage = data.urlImage;
        });
      }
    })
  }

  addCart(id: number){
    console.log('este es el producto ',this.name)
    console.log('este es el id ',this.id)
    let item = new ItemCard(id, this.name, this.quantity, this.price)
    this.cartService.addItemCart(item);
    console.log('total ',this.cartService.totalCart())
    this.toastr.success('El producto fue agregado al carrito', 'carrito compras');
  }
}
