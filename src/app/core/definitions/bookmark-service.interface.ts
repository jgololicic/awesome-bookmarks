import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {IBookmark} from './bookmark.interface';

@Injectable()
export abstract class BookmarkService {
  public bookmarks$: Observable<IBookmark[]>;

  public abstract save(bookmark: IBookmark): void;

  public abstract remove(bookmark: IBookmark): void;

  public abstract load(): void;
}
