import { Routes } from '@angular/router';
import {AuthLayoutComponent} from './core/layout/auth-layout/auth-layout.component';
import {NotFoundComponent} from './core/pages/not-found/not-found.component';
import {authGuard} from './core/guards/auth/auth.guard';
import {guestGuard} from './core/guards/auth/guest.guard';
import {LoginComponent} from './core/pages/auth/login/login.component';
import {RegisterComponent} from './core/pages/auth/register/register.component';
import {ForgetPasswordComponent} from './core/pages/auth/forget-password/forget-password.component';
import {HomeComponent} from './features/pages/home/home.component';
import {BrandsComponent} from './features/pages/brands/brands.component';
import {ProductsComponent} from './features/pages/products/products.component';
import {ProductComponent} from './features/pages/product/product.component';
import {CategoriesComponent} from './features/pages/categories/categories.component';
import {CartComponent} from './features/pages/cart/cart.component';
import {WishListComponent} from './features/pages/wish-list/wish-list.component';
import {CheckOutComponent} from './features/pages/check-out/check-out.component';
import {OrdersComponent} from './features/pages/orders/orders.component';


export const routes: Routes = [
  { path: 'auth' ,  component: AuthLayoutComponent , children:[
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login',canActivate:[guestGuard], component:LoginComponent,title:'Login'},
      { path: 'register',canActivate:[guestGuard], component:RegisterComponent,title:'Register'},
      { path: 'forget-password',canActivate:[guestGuard], component:ForgetPasswordComponent ,title:'Forget Password'},
    ]
  },
  { path: 'home', canActivate:[authGuard], component:HomeComponent,title:'Home'},
  { path: 'brands', canActivate:[authGuard],  component:BrandsComponent,title:'Brands'},
  { path: 'products', canActivate:[authGuard],  component:ProductsComponent,title:'Products'},
  { path: 'product/:id', canActivate:[authGuard],  component:ProductComponent,title:'Product'},
  { path: 'categories', canActivate:[authGuard],  component:CategoriesComponent,title:'Categories'},
  { path: 'cart', canActivate:[authGuard],  component:CartComponent,title:'Cart'},
  { path: 'wish-list', canActivate:[authGuard],  component:WishListComponent ,title:'WishList'},
  { path: 'checkOut/:cartId', canActivate:[authGuard], component:CheckOutComponent  ,title:'CheckOut'},
  { path: 'allorders', canActivate:[authGuard],  component:OrdersComponent,title:'Orders'},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: '**', component: NotFoundComponent,title:'Not Found' },
];
