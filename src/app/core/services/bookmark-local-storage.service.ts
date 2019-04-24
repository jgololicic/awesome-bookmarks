import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {IBookmark} from '../definitions/bookmark.interface';
import {BookmarkService} from '../definitions/bookmark-service.interface';
import {BookmarkAction} from '../definitions/bookmark-action';
import {UtilsService} from './utils.service';
import * as uuid from 'uuid/v4';


@Injectable()
export class BookmarkLocalStorageService implements BookmarkService {

  public bookmarks$: Observable<IBookmark[]>;
  private bookmarksSubject: BehaviorSubject<IBookmark[]>;
  private readonly LOCAL_STORAGE_KEY = 'our_very_unique_key';

  public constructor(private utilsService: UtilsService, @Inject('LOCAL_STORAGE') localStorage) {
    if (!localStorage) {
      throw new Error('Local storage not supported');
    }

    this.bookmarksSubject = new BehaviorSubject([]);
    this.bookmarks$ = this.bookmarksSubject.asObservable();
  }

  public load(): void {
    const state: string = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    this.bookmarksSubject.next(JSON.parse(state) || []);
  }

  public remove(bookmark: IBookmark): void {
    this.updateState(bookmark, BookmarkAction.REMOVE);
  }

  public save(bookmark: IBookmark): void {
    if (!bookmark.id) {
      bookmark.id = uuid();
    }
    this.updateState(bookmark, BookmarkAction.SAVE);
  }

  private updateState(bookmark: IBookmark, action: BookmarkAction): void {
    const oldState = this.bookmarksSubject.getValue();
    const newState = this.utilsService.getNewState(oldState, bookmark, action);
    this.bookmarksSubject.next(newState);
    this.updateLocalStorage(newState);
  }

  private updateLocalStorage(state: IBookmark[]): void {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(state));
  }
}
