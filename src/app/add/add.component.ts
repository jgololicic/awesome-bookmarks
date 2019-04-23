import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {BookmarkService} from '../core/definitions/bookmark-service.interface';
import {IBookmark} from '../core/definitions/bookmark.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {

  public bookmarkForm = this.fb.group({
    link: [null, Validators.required],
    description: null,
    tags: null,
    visibility: true,
  });

  public constructor(private fb: FormBuilder,
                     private bookmarks: BookmarkService,
                     private router: Router) {
  }

  public onSubmit(): void {
    const bookmark: IBookmark = this.bookmarkForm.getRawValue();
    this.bookmarks.save(bookmark);
    this.router.navigateByUrl('/');
  }
}
