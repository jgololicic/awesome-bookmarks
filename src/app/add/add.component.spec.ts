import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {AddComponent} from './add.component';
import {AppModule} from '../app.module';
import {AddModule} from './add.module';
import {FormBuilder, Validators} from '@angular/forms';
import {BookmarkService} from '../core/definitions/bookmark-service.interface';
import {Router} from '@angular/router';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  const LINK = 'http://test123.com';
  const DESCRIPTION = 'test description';
  const TAGS = 'tag1, tags';
  const VISIBILITY = true;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        AddModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create bookmark form', inject([FormBuilder], (fb) => {
    const spy = spyOn(fb, 'group').and.callThrough();
    fixture = TestBed.createComponent(AddComponent);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith({
      link: [null, Validators.required],
      description: null,
      tags: null,
      visibility: true,
    });
  }));

  it('should not submit form until link is entered', () => {
    const spy = spyOn(component, 'onSubmit').and.callThrough();
    fixture.nativeElement.querySelector('button').click();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should submit form once at least link is entered', () => {
    const bookmarkService = TestBed.get(BookmarkService);
    const router = TestBed.get(Router);
    const spyBookmarks = spyOn(bookmarkService, 'save').and.callFake(() => {});
    const spyRouter = spyOn(router, 'navigateByUrl').and.callFake(() => {});
    //
    expect(component.bookmarkForm.valid).toBeFalsy();

    component.bookmarkForm.controls.link.setValue(LINK);
    component.bookmarkForm.controls.description.setValue(DESCRIPTION);
    component.bookmarkForm.controls.tags.setValue(TAGS);
    fixture.detectChanges();
    expect(component.bookmarkForm.valid).toBeTruthy();

    fixture.nativeElement.querySelector('button').click();
    expect(spyBookmarks).toHaveBeenCalledWith({
      link: LINK,
      description: DESCRIPTION,
      tags: TAGS,
      visibility: VISIBILITY
    });
    expect(spyRouter).toHaveBeenCalled();
  });

});
