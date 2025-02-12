import {Component, EventEmitter, Output} from '@angular/core';
import {SearchService} from '../../../services/search/search.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'filterComponent',
  imports: [
    FormsModule
  ],
  templateUrl: './filter.component.html',
  standalone: true,
  styleUrl: './filter.component.css'
})

export class FilterComponent {
  @Output() filterChanged = new EventEmitter<any>();
  filterProduct= {
    price: '',
    sortByName: '',
    category: '',
    CreatedFrom: '',
    CreatedTo: '',
    priceFrom: null,
    priceTo: null,
  }

  constructor(private searchService: SearchService) {}

  onFilterChange() {
    this.filterChanged.emit(this.filterProduct);
  }

  onSearch (event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchService.setSearchText(input.value);
  }
}
