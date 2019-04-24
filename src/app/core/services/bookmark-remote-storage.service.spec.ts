import {async, TestBed} from '@angular/core/testing';

import {BookmarkRemoteStorageService} from './bookmark-remote-storage.service';
import {of, Subscription} from 'rxjs';
import {CoreModule} from '../core.module';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {bookmarks} from './api.data';
import {IBookmark} from '../definitions/bookmark.interface';

describe('BookmarkRemoteStorageService', () => {

  let service: BookmarkRemoteStorageService;
  let httpClientSpy;
  const subscription: Subscription = new Subscription();
  const BACKEND_URL = 'http://localhost:4200/api/bookmarks'; // should come form config

  const LINK = 'http://test123.com';
  const DESCRIPTION = 'test description';
  const TAGS = 'tag1, tags';
  const VISIBILITY = true;

  beforeEach(async(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'put', 'delete', 'post']);
    TestBed.configureTestingModule({
      imports: [
        CoreModule
      ],
      providers: [
        {
          provide: HttpClient,
          useValue: httpClientSpy
        }
      ]
    });
  }));

  beforeEach(() => {
    subscription.unsubscribe();
    TestBed.configureTestingModule({});
    httpClientSpy.get.and.returnValue(of(bookmarks));
    httpClientSpy.delete.and.returnValue(of(new HttpResponse({status: 200})));
    httpClientSpy.post.and.returnValue(of(new HttpResponse({status: 200})));
    service = TestBed.get(BookmarkRemoteStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.bookmarks$).toBeTruthy();
  });

  it('on load should dispatch http get request & emit bookmarks', () => {
    service.load();
    expect(httpClientSpy.get.calls.count()).toEqual(1);
    expect(httpClientSpy.get).toHaveBeenCalledWith(BACKEND_URL);
    subscription.add(
      service.bookmarks$.subscribe(b => expect(b.length).toEqual(bookmarks.length))
    );
  });

  it('on remove should dispatch http delete request & emit bookmarks', () => {
    service.load();
    expect(httpClientSpy.get.calls.count()).toEqual(1);
    service.remove(bookmarks[0]);
    subscription.add(
      service.bookmarks$.subscribe(b => expect(b.length).toEqual(bookmarks.length - 1))
    );
  });

  it('on save should dispatch http post request & emit bookmarks', () => {
    service.load();
    const newBookmark: IBookmark = {
      link: LINK,
      description: DESCRIPTION,
      tags: TAGS,
      visibility: VISIBILITY
    };
    service.save(newBookmark);
    subscription.add(
      service.bookmarks$.subscribe(b => expect(b.length).toEqual(bookmarks.length + 1))
    );
  });
});
