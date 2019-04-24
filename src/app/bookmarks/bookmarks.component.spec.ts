import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BookmarksComponent} from './bookmarks.component';
import {AppModule} from '../app.module';
import {BookmarkService} from '../core/definitions/bookmark-service.interface';
import {bookmarks} from '../core/services/api.data';
import {By} from '@angular/platform-browser';

describe('BookmarksComponent', () => {
  let component: BookmarksComponent;
  let fixture: ComponentFixture<BookmarksComponent>;
  let bookmarkService: BookmarkService;
  let bookmarkServiceSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    bookmarkService = TestBed.get(BookmarkService);
    bookmarkServiceSpy = spyOn<any>(bookmarkService, 'load').and.callFake(
      () => (bookmarkService as any).bookmarksSubject.next(bookmarks)
    );
    bookmarkService.load();

    fixture = TestBed.createComponent(BookmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should only display visible bookmarks (equals to 2)', () => {
    expect(fixture.debugElement.queryAll(By.css('mat-grid-tile')).length).toEqual(2);
  });

  it('should filter bookmarks based on search string', () => {
    const searchInput: HTMLInputElement = fixture.nativeElement.querySelector('input');
    searchInput.value = bookmarks[0].tags.substr(0, 3);
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('mat-grid-tile')).length).toEqual(1);
  });
});
