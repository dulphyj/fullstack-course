import { Component, OnInit } from '@angular/core';
import { Category } from '../../../common/category';
import { CategoryService } from '../../../services/category.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService, private toastr: ToastrService){}
  ngOnInit(): void {
    this.listCategories();
  }

  listCategories(){
    this.categoryService.getCategoryList().subscribe(data => {
      this.categories = data;
    });
  }

  deleteCategoryById(id: number){
    Swal.fire({
      title: "Seguro queire eliminar?",
      text: "Se perderan los datos de esta categoria!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategoryById(id).subscribe( () => {
          this.listCategories()
        });
        Swal.fire({
          title: "Deleted!",
          text: "Categoria eliminado.",
          icon: "success"
        });
      }
    });
  }

}
