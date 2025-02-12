import {Component, OnInit} from '@angular/core';
import {CommonModule,} from '@angular/common';
import {FormsModule, NgForm} from '@angular/forms';
import {ProductService} from '../../../services/product/product.service';
import {SearchService} from '../../../services/search/search.service';

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
    "categoryId": null,
    "productImageUrl": "",
    "userId": 0

  };
  categoryList: any [] = [];
  productList: any [] = [];
  filterProductList: any [] = [];

  imageRegex = new RegExp(
    "^(https?:\\/\\/(?:[\\w.-]+)\\/.*(?:\\.(png|jpg|jpeg|gif|svg|webp))?(\\?.*)?)|" +
    "^(https?:\\/\\/encrypted-tbn\\d+\\.gstatic\\.com\\/images\\?q=tbn:[\\w-]+(?:\\&.*)?)|" +
    "^(data:image\\/(png|jpeg|jpg|gif|bmp|webp);base64,[A-Za-z0-9+/]+={0,2})$"
  );

  imageInvalid = false;

  get isFormInvalid(): boolean {
    return (
      !this.productObj.productSku ||
      !this.productObj.productName ||
      this.productObj.productName.length < 3 ||
      !this.productObj.productPrice ||
      this.productObj.productPrice < 1 ||
      !this.productObj.categoryId ||
      !this.productObj.productImageUrl ||
      !this.productObj.productDescription ||
      this.imageInvalid
    )
  }

  constructor(private productService: ProductService, private searchService: SearchService) {
  }

  ngOnInit() {
    this.getAllProducts();
    this.getAllCategories();

    this.searchService.searchText$.subscribe((text) => {
      this.filterProductList = this.productList.filter(product =>
        product.productName.toLowerCase().includes(text.toLowerCase()));
    })
  }

  getAllProducts() {
    this.productService.getProduct().subscribe((res: any) => {
      this.productList = res.data;
      this.filterProductList = this.productList;
    });
  }

  getAllCategories() {
    this.productService.getCategory().subscribe((res: any) => {
      this.categoryList = res.data;
    });
  }

  onSave() {
    if (this.isFormInvalid) {
      alert("Please fill all fields correctly")
    }

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
    const isDelete = confirm('Delete this product?');
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

  validateImageURL() {
    this.imageInvalid = !this.imageRegex.test(this.productObj.productImageUrl);
  }


}
