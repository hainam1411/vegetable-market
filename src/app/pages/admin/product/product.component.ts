import {Component, OnInit} from '@angular/core';
import {CommonModule,} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ProductService} from '../../../services/product/product.service';

@Component({
  selector: 'app-product',
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  standalone: true,
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  isSidePanelVisible: boolean = false;
  productObj: any = {
    "productId": 0,
    "productName": "",
    "productPrice": 0,
    "productShortName": "",
    "productDescription": "",
    "productSku": "",
    "createdDate": new Date(),
    "deliveryTimeSpan": "",
    "categoryId": 0,
    "productImageUrl": "",
    "userId": 0

  };
  categoryList: any [] = [];
  productList: any [] = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.getAllProducts();
    this.getAllCategories();
  }

  getAllProducts() {
    this.productService.getProduct().subscribe((res: any) => {
      this.productList = res.data;
    });
  }

  getAllCategories() {
    this.productService.getCategory().subscribe((res: any) => {
      this.categoryList = res.data;
    });
  }

  onSave() {
    this.productService.saveProduct(this.productObj).subscribe((res: any) => {
      debugger;
      if (res.result) {
        alert('Product created successfully');
        this.getAllProducts();
      } else {
        alert(res.message);
      }
    });
  }

  onEdit(item: any) {
    this.productObj = item;
    this.openSidePanel();

  }

  onUpdate() {
    this.productService.updateProduct(this.productObj).subscribe((res: any) => {
      debugger;
      if (res.result) {
        alert('Product updated successfully');
        this.getAllProducts();
      } else {
        alert(res.message);
      }
    });

  }

  onDelete(item: any) {
const isDelete  = confirm('Delete this product?');
if (isDelete) {
  this.productService.deleteProduct(item.productId).subscribe((res: any) => {
    debugger;
    if (res.result) {
      alert('Product deleted.');
      this.getAllProducts();
    } else {
      alert(res.message);
    }
  });
}
  }

  openSidePanel() {
    this.isSidePanelVisible = true;
  }

  closeSidePanel() {
    this.isSidePanelVisible = false
  }

}
