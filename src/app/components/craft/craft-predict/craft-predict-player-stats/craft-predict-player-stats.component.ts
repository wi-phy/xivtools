import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PlayerStats } from '../../../../models/player-stats';
import { CraftPredictService } from '../../../../services/craft-predict.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-craft-predict-player-stats',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './craft-predict-player-stats.component.html',
  styleUrl: './craft-predict-player-stats.component.scss',
})
export class CraftPredictPlayerStatsComponent {
  fb = inject(FormBuilder);
  predictService = inject(CraftPredictService);

  form: FormGroup;

  constructor() {
    this.form = this.fb.group({
      craftmanship: 4065,
      control: 3976,
      level: 90,
      ps: 604,
    });
    this.form.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value: PlayerStats) => {
        this.predictService.playerStats.set(value);
      });
  }
}
