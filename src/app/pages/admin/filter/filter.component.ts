import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {SearchService} from '../../../services/search/search.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-filter',
  imports: [
    FormsModule, CommonModule
  ],
  templateUrl: './filter.component.html',
  standalone: true,
  styleUrl: './filter.component.css'
})

export class FilterComponent implements OnInit, OnChanges {
  @Input() categoryList: any[] = [];
  @Output() filterChanged = new EventEmitter<any>();
  filterProduct= {
    price: '',
    sortByName: '',
    category: null as number | null,
    CreatedFrom: '',
    CreatedTo: '',
    priceFrom: null,
    priceTo: null,
  }

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    console.log("category list:", this.categoryList);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['categoryList']) {
      console.log("Updated category list:", this.categoryList);
    }
  }

  onFilterChange() {
    this.filterProduct.category = this.filterProduct.category !== null ? Number(this.filterProduct.category) : null;
    this.filterChanged.emit(this.filterProduct);
  }




  onSearch (event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchService.setSearchText(input.value);
  }
}
