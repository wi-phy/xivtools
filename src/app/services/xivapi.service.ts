import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, map, switchMap, tap } from 'rxjs';
import { ResultsXivapi } from '../models/xivapi/results-xivapi.model';
import { SearchXivapi } from '../models/xivapi/search-xivapi.model';
import { Recipe, RecipeXivapi } from '../models/xivapi/recipe-xivapi.model';

@Injectable({
  providedIn: 'root',
})
export class XivapiService {
  private http = inject(HttpClient);

  search = signal<string>('');
  recipeId = signal<string>('');

  /**
   * Observable/signal for the list of recipes
   */
  private recipes$ = toObservable(this.search).pipe(
    filter(Boolean),
    switchMap((name) => {
      name = name.replaceAll(' ', '+');
      return this.http
        .get<SearchXivapi>(
          `https://xivapi.com/search?language=fr&string=${name}`
        )
        .pipe(
          map((res: SearchXivapi) => {
            return res.Results;
          }),
          map((res: ResultsXivapi[]) =>
            res.filter((r) => r.UrlType === 'Recipe')
          )
        );
    })
  );
  recipes = toSignal<ResultsXivapi[]>(this.recipes$);

  /**
   * Observable/signal for a specific recipe
   */
  private recipe$ = toObservable(this.recipeId).pipe(
    filter(Boolean),
    switchMap((id) => {
      return this.http
        .get<RecipeXivapi>(`https://xivapi.com/recipe/${id}`)
        .pipe(
          map((res: RecipeXivapi) => {
            return {
              ID: res.ID,
              Name_fr: res.Name_fr,
              RecipeLevelTable: res.RecipeLevelTable,
              QualityFactor: res.QualityFactor,
              DifficultyFactor: res.DifficultyFactor,
              DurabilityFactor: res.DurabilityFactor,
              Icon: res.Icon,
              ClassJob: {
                ID: res.ClassJob.ID,
                Abbreviation_fr: res.ClassJob.Abbreviation_fr,
                Icon: res.ClassJob.Icon,
              },
            } as Recipe;
          })
        );
    })
  );
  recipe = toSignal(this.recipe$);
}
