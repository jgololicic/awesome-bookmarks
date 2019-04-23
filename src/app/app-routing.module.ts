import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BookmarksComponent} from './bookmarks/bookmarks.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'bookmarks'
  },
  {
    path: 'bookmarks',
    component: BookmarksComponent
  },
  {
    path: 'add',
    loadChildren: './add/add.module#AddModule'
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
