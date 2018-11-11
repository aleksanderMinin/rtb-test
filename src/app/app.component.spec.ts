import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule }   from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { BLOCKS } from './default-blocks';

import { EmailsEditorComponent } from './emails-editor/emails-editor.component';
import { EmailBlockComponent } from './emails-editor/email-block/email-block.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        EmailsEditorComponent,
        EmailBlockComponent
      ],
      imports: [ FormsModule,
        BrowserModule
      ]
    }).compileComponents();

  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should renders', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('emails-editor')).toBeTruthy();
  });
});
