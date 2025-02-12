import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }
  private searchText = new BehaviorSubject<string>('');
  searchText$ = this.searchText.asObservable();

  private searchResults = new BehaviorSubject<string>("")
  searchResults$ = this.searchResults.asObservable()

  setSearchText(text: string) {
    this.searchText.next(text);
  }
  setSearchResults(results: string) {
    this.searchResults.next(results);
  }
}
