import { PaginationXivapi } from './pagination-xivapi.model';
import { ResultsXivapi } from './results-xivapi.model';

export interface SearchXivapi {
  Pagination: PaginationXivapi;
  Results: ResultsXivapi[];
  SpeedMs: number;
}
