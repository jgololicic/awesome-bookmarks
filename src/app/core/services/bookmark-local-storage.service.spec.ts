import { TestBed } from '@angular/core/testing';

import { BookmarkLocalStorageService } from './bookmark-local-storage.service';

describe('BookmarkLocalStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookmarkLocalStorageService = TestBed.get(BookmarkLocalStorageService);
    expect(service).toBeTruthy();
  });
});
