import {Component} from '@angular/core';
import {BookmarkService} from '../core/definitions/bookmark-service.interface';

@Component({
  selector: 'app-home',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent {
  constructor(public bookmarks: BookmarkService) {
  }
}
