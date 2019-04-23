import {Injectable} from '@angular/core';
import {BookmarkService} from '../definitions/bookmark-service.interface';
import {IBookmark} from '../definitions/bookmark.interface';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {first, map} from 'rxjs/operators';
import {UtilsService} from './utils.service';
import {BookmarkAction} from '../definitions/bookmark-action';

@Injectable()
export class BookmarkRemoteStorageService implements BookmarkService {

  public bookmarks$: Observable<IBookmark[]>;
  private bookmarksSubject: BehaviorSubject<IBookmark[]>;
  private readonly SERVER_URL: string = 'http://localhost:4200/api'; // comes from config


  public constructor(private http: HttpClient,
                     private utilsService: UtilsService) {
    this.bookmarksSubject = new BehaviorSubject([]);
    this.bookmarks$ = this.bookmarksSubject.asObservable();
  }


  public load(): void {
    this.http.get<IBookmark[]>(`${this.SERVER_URL}/bookmarks`)
      .pipe(
        first()
      ).subscribe(bookmarks => this.bookmarksSubject.next(bookmarks));
  }

  public remove(bookmark: IBookmark): void {
    this.http.delete(`${this.SERVER_URL}/bookmarks/${bookmark.id}`)
      .pipe(
        first()
      ).subscribe(() => {
      const oldState = this.bookmarksSubject.getValue();
      const newState = this.utilsService.getNewState(oldState, bookmark, BookmarkAction.REMOVE);
      this.bookmarksSubject.next(newState);
    });
  }

  public save(bookmark: IBookmark): void {
    this.remoteMethod<IBookmark>(bookmark).pipe(
      first(),
      map(response => response || bookmark) // In memory API returns null on PUT
    ).subscribe(response => {
      const oldState = this.bookmarksSubject.getValue();
      const newState = this.utilsService.getNewState(oldState, response, BookmarkAction.SAVE);
      this.bookmarksSubject.next(newState);
    });

  }

  private remoteMethod<T>(bookmark): Observable<T> {
    return bookmark.id !== undefined ?
      this.http.put<T>(`${this.SERVER_URL}/bookmarks`, bookmark) :
      this.http.post<T>(`${this.SERVER_URL}/bookmarks`, bookmark);
  }
}
