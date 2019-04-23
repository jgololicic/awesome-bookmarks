import {Component} from '@angular/core';
import {BookmarkService} from '../core/definitions/bookmark-service.interface';
import {IBookmark} from '../core/definitions/bookmark.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  public bookmarkForm: FormGroup;

  constructor(public bookmarks: BookmarkService,
              private fb: FormBuilder) {
  }

  public onRemove(bookmark: IBookmark): void {
    this.bookmarks.remove(bookmark);
  }

  public onEdit(bookmark): void {
    this.initForm(bookmark);
  }

  public onSubmit(): void {
    const bookmark: IBookmark = this.bookmarkForm.getRawValue();
    this.bookmarks.save(bookmark);
    this.bookmarkForm = undefined;
  }

  private initForm(bookmark): void {
    this.bookmarkForm = this.fb.group({
      id: [bookmark.id, Validators.required],
      link: [bookmark.link, Validators.required],
      description: bookmark.description,
      tags: bookmark.tags,
      visibility: bookmark.visibility,
    });
  }
}
