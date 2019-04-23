import { TestBed } from '@angular/core/testing';

import { ApiInMemoryService } from './api-in-memory.service';

describe('ApiInMemoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiInMemoryService = TestBed.get(ApiInMemoryService);
    expect(service).toBeTruthy();
  });
});
