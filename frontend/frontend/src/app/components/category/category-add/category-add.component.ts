import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../common/category';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrl: './category-add.component.css'
})
export class CategoryAddComponent implements OnInit {
id: number =  0;
name: string = '';

constructor(private categoryService: CategoryService, private toastr: ToastrService, private router: Router, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.getCategoryById();
  }

  addCategory() {
    let category = new Category(this.id, this.name);
    this.categoryService.createCategory(category).subscribe(() => {
      this.toastr.success('Categoria adicionada com sucesso!', "Categorias");
      this.router.navigate(['/admin/category']);
    });
  }
  
  getCategoryById(){
    this.activatedRoute.params.subscribe(category => {
      let id = category['id'];
      if (id){
        this.categoryService.getCategoryById(id).subscribe(res => {
          this.id = res.id;
          this.name = res.name;
        })
      }
    })
  }

  

}
