import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constant } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  getCategory() {
    return this.http.get('/api/BigBasket/' + Constant.METHODS.GET_ALL_CATEGORY);
  }
  getProduct() {
    return this.http.get('/api/BigBasket/' + Constant.METHODS.GET_ALL_PRODUCT);
  }
  saveProduct(obj: any) {
    return this.http.post('/api/BigBasket/' + Constant.METHODS.CREATE_PRODUCT, obj);
  }
  updateProduct(obj: any) {
    return this.http.post('/api/BigBasket/' + Constant.METHODS.UPDATE_PRODUCT, obj);
  }
  deleteProduct(id: any) {
    return this.http.get('/api/BigBasket/' + Constant.METHODS.DELETE_PRODUCT + id);
  }
}
