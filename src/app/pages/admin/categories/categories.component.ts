import { Component } from '@angular/core';
import {ProductService} from '../../../services/product/product.service';
import {map, Observable} from 'rxjs';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-categories',
  imports: [
    CommonModule
  ],
  templateUrl: './categories.component.html',
  standalone: true,
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  products$: Observable<any>
constructor(private productservice: ProductService) {
    this.products$ = this.productservice.getCategory().pipe(
      map((item:any)   => {
        return item.data;
      })
    );
}
}
