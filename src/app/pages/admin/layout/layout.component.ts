import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {SearchService} from '../../../services/search/search.service';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './layout.component.html',
  standalone: true,
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  constructor(private searchService: SearchService) {}

  onSearch (event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchService.setSearchText(input.value);
  }


}
