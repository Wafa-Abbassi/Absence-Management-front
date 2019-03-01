import { TestBed, inject } from '@angular/core/testing';

import { FerieService } from './ferie.service';

describe('FerieService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FerieService]
    });
  });

  it('should be created', inject([FerieService], (service: FerieService) => {
    expect(service).toBeTruthy();
  }));
});
