import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { ResultsXivapi } from '../models/xivapi/results-xivapi.model';
import { SearchXivapi } from '../models/xivapi/search-xivapi.model';

@Injectable({
  providedIn: 'root',
})
export class XivapiService {
  http = inject(HttpClient);

  getRecipeByName(name: string) {
    name = name.replaceAll(' ', '+');
    return this.http
      .get<SearchXivapi>(`https://xivapi.com/search?language=fr&string=${name}`)
      .pipe(
        map((res: SearchXivapi) => {
          return res.Results;
        }),
        map((res: ResultsXivapi[]) => res.filter((r) => r.UrlType === 'Recipe'))
      );
  }
}
