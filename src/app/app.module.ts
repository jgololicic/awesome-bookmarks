import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BookmarksComponent} from './bookmarks/bookmarks.component';
import {CoreModule} from './core/core.module';
import {BookmarkService} from './core/definitions/bookmark-service.interface';
import {BookmarkLocalStorageService} from './core/services/bookmark-local-storage.service';
import {MaterialModule} from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {BookmarkRemoteStorageService} from './core/services/bookmark-remote-storage.service';
import {HttpClient} from '@angular/common/http';
import {ApiInMemoryService} from './core/services/api-in-memory.service';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {UtilsService} from './core/services/utils.service';

@NgModule({
  declarations: [
    AppComponent,
    BookmarksComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    InMemoryWebApiModule.forRoot(ApiInMemoryService)
  ],
  providers: [
    {
      provide: BookmarkService,
      useFactory: (http: HttpClient, utils: UtilsService) => {
        // Decide which storage to use based on some logic
        const useOffline = false;

        if (useOffline) {
          return new BookmarkLocalStorageService(utils);
        } else {
          return new BookmarkRemoteStorageService(http, utils);
        }
      },
      deps: [HttpClient, UtilsService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
