import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CommonModule,} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ProductService} from '../../../services/product/product.service';
import {SearchService} from '../../../services/search/search.service';
import {FilterService} from '../../../services/filter/filter.service';
import {FilterComponent} from '../filter/filter.component';
import Swal from 'sweetalert2';
declare var bootstrap: any;

@Component({
  selector: 'app-product',
  imports: [CommonModule, FormsModule, FilterComponent],
  templateUrl: './product.component.html',
  standalone: true,
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  @ViewChild('productModal') productModal!: ElementRef;
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
  filterOptions: any = {};
  isLoading = false;

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

  constructor(private productService: ProductService, private searchService: SearchService, private filterService: FilterService) {
  }

  ngOnInit() {
    this.getAllProducts();
    this.getAllCategories();

    this.searchService.searchText$.subscribe((text) => {
      this.searchService.setSearchResults(this.productList, text);
    });
    this.searchService.searchResults$.subscribe((results) =>{
      this.filterProductList = results;
    });

    // this.searchService.searchText$.subscribe((text) => {
    //   this.filterProductList = this.productList.filter(product =>
    //     product.productName.toLowerCase().includes(text.toLowerCase()));
    // })
  }

  getAllProducts() {
    this.isLoading = true;
    this.productService.getProduct().subscribe((res: any) => {
      this.productList = res.data;
      this.filterProductList = this.productList;
      this.isLoading = false;
    });
  }

  getAllCategories() {
    this.productService.getCategory().subscribe((res: any) => {
      this.categoryList = res.data;
    });
  }

  onSave() {
    if (this.isFormInvalid) {
      Swal.fire('Error!', 'Please fill all information', 'error');
      return;
    }

    this.productService.saveProduct(this.productObj).subscribe((res: any) => {
      debugger;
      if (res.result) {
        Swal.fire('Success!', 'Product saved successfully', 'success');
        this.getAllProducts();

      } else {
        alert(res.message);
      }
    });
  }

  onEdit(item: any) {
    this.productObj = { ...item };
    const modal = new bootstrap.Modal(this.productModal.nativeElement);
    modal.show();
  }

  onUpdate() {
    this.productService.updateProduct(this.productObj).subscribe((res: any) => {
      debugger;
      if (res.result) {
        Swal.fire ('Success!','Product information changed', 'success');9
        this.getAllProducts();
      } else {
        alert(res.message);
      }
    });

  }

  onDelete(item: any) {
     Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"})
       .then((result) => {
        if (result.isConfirmed) {
      this.productService.deleteProduct(item.productId).subscribe((res: any) => {
        debugger;
        if (res.result) {
          Swal.fire({
            title: "Deleted",
            text: "Product deleted",
            icon: "success"
          })
          this.getAllProducts();
        } else {
          Swal.fire( "error", res.message, "error");

        }
      },err => {
        if (err.error && err.error.message.includes("REFERENCE constrain")) {
          Swal.fire( "error", "This product is referenced in another entity", "error");
        } else  {
          Swal.fire( "error", "An error occurred", "error");
        }
      } );
    }})

  }

  openModal () {
    this.productObj = {};
    const modal = new bootstrap.Modal(this.productModal.nativeElement);
    modal.show();
  }

  validateImageURL() {
    this.imageInvalid = !this.imageRegex.test(this.productObj.productImageUrl);
  }

  onFilterChanged(filterData: any) {
    this.filterOptions = filterData;
    const filtered = this.filterService.filterProducts(this.productList, this.filterOptions);
    this.searchService.searchText$.subscribe((text) => {
      this.filterProductList = text ? filtered.filter(product => product.productName.toLowerCase().includes(text.toLowerCase())) : filtered;
    });
  }



}
