import {async, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {AppModule} from './app.module';
import {BookmarkService} from './core/definitions/bookmark-service.interface';

describe('AppComponent', () => {

  let bookmarkService: BookmarkService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        RouterTestingModule
      ],
      declarations: [],
    }).compileComponents();

    bookmarkService = TestBed.get(BookmarkService);
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should load bookmarks', () => {
    const spy = spyOn(bookmarkService, 'load');
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
});
