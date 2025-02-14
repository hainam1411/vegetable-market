import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {SearchService} from '../../../services/search/search.service';
import {FilterComponent} from '../filter/filter.component';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './layout.component.html',
  standalone: true,
  styleUrl: './layout.component.css'
})
export class LayoutComponent {



}
