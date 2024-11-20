import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.listProducts();
  }
  listProducts(){
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      console.log(data);
    });
  }
  deleteProduct(id: number){
    Swal.fire({
      title: "Seguro queire eliminar?",
      text: "Se perderan los datos de este producto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProductById(id).subscribe( () => {
          this.listProducts()
        });
        Swal.fire({
          title: "Deleted!",
          text: "Producto eliminado.",
          icon: "success"
        });
      }
    });
  }
  
}
