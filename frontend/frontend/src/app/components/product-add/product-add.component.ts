import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../common/category';
import { SessionStorageService } from '../../services/session-storage.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent implements OnInit {
  id: number = 0;
  code: string = '';
  name: string = '';
  description: string = '';
  price: number = 0;
  urlImage: string = '';
  userId: string = '1';
  categoryId: string = '2';
  selectFile!: File;
  categories: Category[] = [];
  user: number = 0;

  constructor(private productService: ProductService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private sessionStorage: SessionStorageService
  ) { }
  ngOnInit(): void {
    this.getProductById();
    this.getCategories();
    this.user = this.sessionStorage.getItem('token').id;
    this.userId = this.user.toString();
  }
  addProduct() {
    const formData = new FormData();
    formData.append('id', this.id.toString());
    formData.append('code', this.code);
    formData.append('name', this.name);
    formData.append('description', this.description);
    formData.append('price', this.price.toString());
    formData.append('image', this.selectFile);
    formData.append('urlImage', this.urlImage);
    formData.append('userId', this.userId);
    formData.append('categoryId', this.categoryId);
    this.productService.createProduct(formData).subscribe(data => {
      console.log(data);
      if(this.id == 0){
        this.toastr.success('producto creado', 'Product');
      }else{
        this.toastr.success('producto actualizado', 'Product');
      }
      
      this.router.navigate(['admin/products']);
    });
  }
  
  getProductById(){
    this.activatedRouter.params.subscribe(prod => {
      let id = prod['id'];
      if(id){
        console.log('valord de id '+ id);
        this.productService.getProductById(id).subscribe(data => {
          this.id = data.id;
          this.code = data.code;
          this.name = data.name;
          this.description = data.description;
          this.price = data.price;
          this.urlImage = data.urlImage;
          this.userId = data.userId;
          this.categoryId = data.categoryId;
        });
      }
  });
  }

  onFileSelected(event: any){
    this.selectFile = event.target.files[0];
    console.log(this.selectFile);
  }

  getCategories(){
    this.categoryService.getCategoryList().subscribe(data => {
      this.categories = data;
      console.log(data);
    })
  }
}
