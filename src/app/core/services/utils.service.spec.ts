import {async, TestBed} from '@angular/core/testing';

import {UtilsService} from './utils.service';
import {CoreModule} from '../core.module';
import {bookmarks} from './api.data';
import {IBookmark} from '../definitions/bookmark.interface';
import {BookmarkAction} from '../definitions/bookmark-action';

describe('UtilsService', () => {

  const LINK = 'http://test123.com';
  const DESCRIPTION = 'test description';
  const TAGS = 'tag1, tags';
  const VISIBILITY = true;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule
      ]
    });
  }));

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should append bookmark to bookmarks when no ID exists', () => {
    const service: UtilsService = TestBed.get(UtilsService);
    const oldState = bookmarks;
    const bookmark: IBookmark = {
      link: LINK,
      description: DESCRIPTION,
      tags: TAGS,
      visibility: VISIBILITY
    };
    const newState = service.getNewState(oldState, bookmark, BookmarkAction.SAVE);
    expect(newState.length).toEqual(4);
  });

  it('should update bookmark when ID exists', () => {
    const service: UtilsService = TestBed.get(UtilsService);
    const oldState = bookmarks;
    const bookmark: IBookmark = Object.assign({}, bookmarks[2]);
    bookmark.link = LINK;
    const newState = service.getNewState(oldState, bookmark, BookmarkAction.SAVE);
    expect(newState.length).toEqual(oldState.length);
    expect(newState[0]).toEqual(oldState[0]);
    expect(newState[1]).toEqual(oldState[1]);
    expect(newState[2]).toEqual(bookmark);
    expect(newState[2].link).toEqual(LINK);
    expect(oldState === newState).toBeFalsy();
  });

  it('should not mutate old state', () => {
    const service: UtilsService = TestBed.get(UtilsService);
    const oldState = bookmarks;
    const bookmark: IBookmark = Object.assign({}, bookmarks[2]);
    bookmark.link = LINK;
    const newState = service.getNewState(oldState, bookmark, BookmarkAction.SAVE);
    expect(newState.length).toEqual(oldState.length);
    expect(oldState === newState).toBeFalsy();
  });

  it('should remove bookmark from the state', () => {
    const service: UtilsService = TestBed.get(UtilsService);
    const oldState = bookmarks;
    const bookmark: IBookmark = Object.assign({}, bookmarks[2]);
    const newState = service.getNewState(oldState, bookmark, BookmarkAction.REMOVE);
    expect(newState.length).toEqual(oldState.length - 1);
    expect(oldState === newState).toBeFalsy();
  });


});
