import { Component, inject } from '@angular/core';
import { XivapiService } from '../../../services/xivapi.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-optimize',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './optimize.component.html',
  styleUrl: './optimize.component.scss',
})
export class OptimizeComponent {
  xivapiService = inject(XivapiService);

  search = '';

  ngOnInit() {}

  searchRecipe(): void {
    // if the search is less than 3 characters or ends with a space, return
    if (this.search.length <= 3 || this.search.slice(-1) === ' ') {
      return;
    } else {
      this.xivapiService.getRecipeByName(this.search).subscribe((res) => {
        console.log(res);
      });
    }
  }
}
