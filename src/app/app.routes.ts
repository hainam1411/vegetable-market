import { Routes } from '@angular/router';
import {LoginComponent} from './pages/admin/login/login.component';
import {LayoutComponent} from './pages/admin/layout/layout.component';
import {ProductComponent} from './pages/admin/product/product.component';
import {CategoriesComponent} from './pages/admin/categories/categories.component';
import {LandingComponent} from './pages/website/landing/landing.component';

export const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'shop', component: LandingComponent},
  {path: '', component: LayoutComponent, children: [
      {path: 'products', component: ProductComponent},
      {path: 'categories', component: CategoriesComponent},


    ]}
];
