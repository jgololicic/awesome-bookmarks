import {FilterBookmarksPipe} from './filter-bookmarks.pipe';
import {bookmarks} from '../../core/services/api.data';

describe('FilterBookmarksPipe', () => {

  it('should filter tags by visibility', () => {
    const pipe = new FilterBookmarksPipe();
    expect(pipe.transform(bookmarks, '', true).length).toEqual(2);
    expect(pipe.transform(bookmarks, '', false).length).toEqual(3);
  });

  it('should filter tags by visibility and filter string', () => {
    const pipe = new FilterBookmarksPipe();
    expect(pipe.transform(bookmarks, 'mdn', true).length).toEqual(1);
    expect(pipe.transform(bookmarks, 'mdn', false).length).toEqual(1);
    expect(pipe.transform(bookmarks, 'non existing tag', false).length).toEqual(0);
    expect(pipe.transform(bookmarks, 'non existing tag', true).length).toEqual(0);
  });
});
