import { Component, inject } from '@angular/core';
import { XivapiService } from '../../../services/xivapi.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-craft-predict',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './craft-predict.component.html',
  styleUrl: './craft-predict.component.scss',
})
export class CraftPredictComponent {
  private xivapiService = inject(XivapiService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  search = '';
  recipes = this.xivapiService.recipes;

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
