import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FilterBookmarksPipe} from './pipes/filter-bookmarks.pipe';

@NgModule({
  declarations: [FilterBookmarksPipe],
  imports: [
    CommonModule
  ],
  exports: [
    FilterBookmarksPipe
  ]
})
export class SharedModule { }
