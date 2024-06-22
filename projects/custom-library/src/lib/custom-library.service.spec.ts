import { TestBed } from '@angular/core/testing';

import { CustomLibraryService } from './custom-library.service';

describe('CustomLibraryService', () => {
  let service: CustomLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
