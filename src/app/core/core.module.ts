import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookmarkLocalStorageService} from './services/bookmark-local-storage.service';
import {BookmarkRemoteStorageService} from './services/bookmark-remote-storage.service';
import {HttpClientModule} from '@angular/common/http';
import {ApiInMemoryService} from './services/api-in-memory.service';
import {UtilsService} from './services/utils.service';

@NgModule({
  declarations: [],
  providers: [
    BookmarkLocalStorageService,
    BookmarkRemoteStorageService,
    UtilsService,
    ApiInMemoryService
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: []
})
export class CoreModule {
}
