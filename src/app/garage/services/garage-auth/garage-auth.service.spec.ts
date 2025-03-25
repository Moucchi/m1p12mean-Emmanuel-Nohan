import { TestBed } from '@angular/core/testing';

import { GarageAuthService } from './garage-auth.service';

describe('GarageAuthService', () => {
  let service: GarageAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GarageAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
