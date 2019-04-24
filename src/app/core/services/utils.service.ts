import {Injectable} from '@angular/core';
import {IBookmark} from '../definitions/bookmark.interface';
import {BookmarkAction} from '../definitions/bookmark-action';

@Injectable()
export class UtilsService {

  constructor() {
  }

  public getNewState(oldState: IBookmark[], bookmark: IBookmark, action: BookmarkAction): IBookmark[] {
    let newState: IBookmark[];

    switch (action) {
      case BookmarkAction.SAVE: {
        const index = oldState.findIndex(item => item.id === bookmark.id);
        if (index === -1) {
          newState = [...oldState, bookmark];
        } else {
          newState = [
            ...oldState.slice(0, index),
            bookmark,
            ...oldState.slice(index + 1)
          ];
        }
        break;
      }

      case BookmarkAction.REMOVE: {
        const index = oldState.findIndex(item => item.id === bookmark.id);
        if (index !== -1) {
          newState = [
            ...oldState.slice(0, index),
            ...oldState.slice(index + 1)
          ];
        }
        break;
      }
    }
    return newState;
  }

}
