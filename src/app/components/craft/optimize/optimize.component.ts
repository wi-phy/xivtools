import { Component, inject } from '@angular/core';
import { XivapiService } from '../../../services/xivapi.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-optimize',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './optimize.component.html',
  styleUrl: './optimize.component.scss',
})
export class OptimizeComponent {
  private xivapiService = inject(XivapiService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  search = '';
  recipes = this.xivapiService.recipes;
  ngOnInit() {}

  searchRecipe(): void {
    // if the search is less than 3 characters or ends with a space, return
    if (this.search.length >= 3 && this.search.slice(-1) !== ' ') {
      this.xivapiService.search.set(this.search);
    }
  }

  goToRecipe(id: string): void {
    this.router.navigate([id], { relativeTo: this.route });
  }
}
