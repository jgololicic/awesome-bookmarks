import {async, TestBed} from '@angular/core/testing';

import {BookmarkLocalStorageService} from './bookmark-local-storage.service';
import {CoreModule} from '../core.module';
import {UtilsService} from './utils.service';
import {Subscription} from 'rxjs';
import {bookmarks} from './api.data';
import {skip} from 'rxjs/operators';

describe('BookmarkLocalStorageService', () => {

  let service: BookmarkLocalStorageService;
  const subscription: Subscription = new Subscription();
  let storage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule
      ],
      providers: [
        {
          provide: 'LOCAL_STORAGE',
          useValue: localStorage
        }
      ]
    });
  }));

  beforeEach(() => {
    subscription.unsubscribe();
    TestBed.configureTestingModule({});
    storage = TestBed.get('LOCAL_STORAGE');
    storage.clear();
    service = new BookmarkLocalStorageService(TestBed.get(UtilsService), storage);
  });

  it('should exists', () => {
    expect(service).toBeTruthy();
    expect(service.bookmarks$).toBeTruthy();
  });

  it('should throw an Error when localStorage is not defined', () => {
    expect(() => new BookmarkLocalStorageService(TestBed.get(UtilsService), undefined))
      .toThrow(new Error('Local storage not supported'));
  });

  it('should get item from local storage when load method is called', () => {
    const spy = spyOn(storage, 'getItem').and.callThrough();
    service.load();
    subscription.add(
      service.bookmarks$.subscribe(b => expect(b).toEqual([]))
    );
    expect(spy).toHaveBeenCalled();
  });

  it('should save bookmarks to local storage', () => {
    bookmarks.forEach(bookmark => service.save(bookmark));
    subscription.add(
      service.bookmarks$.pipe(skip(bookmarks.length - 1)).subscribe(b => expect(b.length).toEqual(bookmarks.length))
    );
  });

});
