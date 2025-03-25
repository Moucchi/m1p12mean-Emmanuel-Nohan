import { TestBed } from '@angular/core/testing';

import { GarageDashboardService } from './garage-dashboard.service';

describe('GarageDashboardService', () => {
  let service: GarageDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GarageDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
