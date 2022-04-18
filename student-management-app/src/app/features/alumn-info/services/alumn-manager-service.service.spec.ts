import { TestBed } from '@angular/core/testing';

import { AlumnManagerServiceService } from './alumn-manager-service.service';

describe('AlumnManagerServiceService', () => {
  let service: AlumnManagerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlumnManagerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
