import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {


  private searchText = new BehaviorSubject<string>('');
  searchText$ = this.searchText.asObservable();

  private searchResults = new BehaviorSubject<any[]>([])
  searchResults$ = this.searchResults.asObservable()
  constructor() { }
  setSearchText(text: string) {
    this.searchText.next(text);
  }
  setSearchResults(products: any[], text: string) {
    if (!text) {
      this.searchResults.next(products);
    } else  {
      const filtered = products.filter(product =>
      product.productName.toLowerCase().includes(text.toLowerCase())
      );
      this.searchResults.next(filtered);
    }

  }
}
