import {Pipe, PipeTransform} from '@angular/core';
import {IBookmark} from '../../core/definitions/bookmark.interface';

@Pipe({
  name: 'filterBookmarks'
})
export class FilterBookmarksPipe implements PipeTransform {

  transform(values: IBookmark[], filterString: string = '', onlyVisible: any = true): any {

    if (onlyVisible) {
      values = values.filter(bookmark => bookmark.visibility === true);
    }

    if (filterString.length > 0) {
      values = values.filter(bookmark => bookmark.tags
        .toLowerCase()
        .indexOf(filterString.toLowerCase()) !== -1);
    }

    return values;
  }
}
