import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminComponent} from './admin.component';
import {AdminModule} from './admin.module';
import {AppModule} from '../app.module';
import {BookmarkService} from '../core/definitions/bookmark-service.interface';
import {bookmarks} from '../core/services/api.data';
import {By} from '@angular/platform-browser';
import {FormBuilder} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {UtilsService} from '../core/services/utils.service';
import {BookmarkRemoteStorageService} from '../core/services/bookmark-remote-storage.service';
import {of} from 'rxjs';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let bookmarkService: BookmarkService;
  let bookmarkServiceSpy;
  let httpClientSpy;

  const LINK = 'http://test123.com';

  beforeEach(async(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'put', 'delete']);
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        AdminModule,
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: BookmarkService,
          useClass: BookmarkRemoteStorageService,
          deps: [HttpClient, UtilsService]
        },
        {
          provide: HttpClient,
          useValue: httpClientSpy
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    bookmarkService = TestBed.get(BookmarkService);
    bookmarkServiceSpy = spyOn<any>(bookmarkService, 'load').and.callFake(
      () => (bookmarkService as any).bookmarksSubject.next(bookmarks)
    );
    bookmarkService.load();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display 3 bookmarks', () => {
    const bookmarkCards = fixture.debugElement.queryAll(By.css('.bookmark-card-list'));
    expect(bookmarkCards.length).toEqual(3);
  });

  it('should remove bookmark when remove button clicked', () => {
    const spy = spyOn(bookmarkService, 'remove').and.callThrough();
    const bookmarkCard = fixture.debugElement.query(By.css('.bookmark-card-list'));
    httpClientSpy.delete.and.returnValue(of(new HttpResponse({status: 200})));

    bookmarkCard.query(By.css('button')).nativeElement.click();
    bookmarkCard.query(By.css('button.removeButton')).nativeElement.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(httpClientSpy.delete.calls.count()).toEqual(1);
    expect(fixture.debugElement.queryAll(By.css('.bookmark-card-list')).length).toEqual(2);
  });

  it('should display edit form when edit clicked', () => {
    const formBuilder = TestBed.get(FormBuilder);
    const spy = spyOn(formBuilder, 'group').and.callThrough();
    const bookmarkCards = fixture.debugElement.query(By.css('.bookmark-card-list'));

    bookmarkCards.query(By.css('button')).nativeElement.click();
    bookmarkCards.query(By.css('button.editButton')).nativeElement.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.bookmarkForm.controls.link.value).toEqual(bookmarks[0].link);
  });

  it('should update bookmark when edit form is submitted', () => {
    const spy = spyOn(TestBed.get(BookmarkService), 'save').and.callThrough();
    httpClientSpy.put.and.returnValue(of(null));
    const bookmarkCard = fixture.debugElement.query(By.css('.bookmark-card-list'));

    bookmarkCard.query(By.css('button')).nativeElement.click();
    bookmarkCard.query(By.css('button.editButton')).nativeElement.click();
    fixture.detectChanges();

    const linkInput: HTMLInputElement = fixture.nativeElement.querySelector('input[placeholder="Link"]');
    linkInput.value = LINK;
    linkInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.bookmarkForm.controls.link.value).toEqual(LINK);

    fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement.click();
    fixture.detectChanges();

    expect(httpClientSpy.put.calls.count()).toEqual(1);
    expect(fixture.debugElement.query(By.css('mat-card-content a')).nativeElement.textContent).toEqual(LINK);
    expect(spy).toHaveBeenCalled();
    expect(component.bookmarkForm).toBeFalsy();
  });
});
