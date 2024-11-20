import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { CategoryAddComponent } from './components/category/category-add/category-add.component';
import { DetailProductComponent } from './components/cart/detail-product/detail-product.component';
import { HeaderUserComponent } from './components/header-user/header-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SumaryOrderComponent } from './components/orders/sumary-order/sumary-order.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { RegistraionComponent } from './components/authentication/registraion/registraion.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'admin/products',
    component: ProductListComponent
  },
  {
    path: 'admin/products/addproduct',
    component: ProductAddComponent
  },
  {
    path: 'admin/products/update/:id',
    component: ProductAddComponent
  },
  {
    path: 'admin/category',
    component: CategoryListComponent
  },
  {
    path: 'admin/category/addcategory',
    component: CategoryAddComponent
  },
  {
    path: 'admin/category/update/:id',
    component: CategoryAddComponent
  },
  {
    path: 'cart/detailproduct/:id',
    component: DetailProductComponent
  },
  {
    path: 'cart/sumary',
    component: SumaryOrderComponent,
    canActivate: [authGuard]
  },
  {
    path: 'payment/success',
    component: PaymentSuccessComponent
  },
  {
    path: 'user/register',
    component: RegistraionComponent
  },
  {
    path: 'user/login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductListComponent,
    HeaderAdminComponent,
    ProductAddComponent,
    CategoryListComponent,
    CategoryAddComponent,
    DetailProductComponent,
    HeaderUserComponent,
    SumaryOrderComponent,
    PaymentSuccessComponent,
    RegistraionComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [
    provideHttpClient(
      withInterceptorsFromDi()
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
