import {Component, ViewEncapsulation} from '@angular/core';
import {BookmarkService} from './core/definitions/bookmark-service.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  constructor(private bookmarksService: BookmarkService) {
    this.bookmarksService.load();
  }
}
