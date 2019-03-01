import { TestBed, inject } from '@angular/core/testing';

import { RttService } from './rtt.service';

describe('RttService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RttService]
    });
  });

  it('should be created', inject([RttService], (service: RttService) => {
    expect(service).toBeTruthy();
  }));
});
