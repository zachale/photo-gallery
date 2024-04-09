import { TestBed } from '@angular/core/testing';

import { AuthTokenServiceService } from './auth-token-service.service';

describe('AuthTokenServiceService', () => {
  let service: AuthTokenServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthTokenServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
