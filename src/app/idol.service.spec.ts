import { TestBed, inject } from '@angular/core/testing';

import { IdolService } from './idol.service';

describe('IdolService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IdolService]
    });
  });

  it('should be created', inject([IdolService], (service: IdolService) => {
    expect(service).toBeTruthy();
  }));
});
