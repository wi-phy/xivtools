import { TestBed } from '@angular/core/testing';

import { XivapiService } from './xivapi.service';

describe('XivapiService', () => {
  let service: XivapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XivapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
