import { TestBed } from '@angular/core/testing';

import { BookmarkRemoteStorageService } from './bookmark-remote-storage.service';

describe('BookmarkRemoteStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookmarkRemoteStorageService = TestBed.get(BookmarkRemoteStorageService);
    expect(service).toBeTruthy();
  });
});
