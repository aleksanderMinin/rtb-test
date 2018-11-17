import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule }   from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';

import { BLOCKS } from './default-blocks';
import { Utils } from './utils';
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
    const component = fixture.componentRef.instance;
    component.getEmailsCount();
    fixture.detectChanges()
    component.addEmail();
    fixture.detectChanges()
    component.getEmailsCount();
    component.addEmail();
    fixture.detectChanges()
    component.getEmailsCount();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('emails-editor')).toBeTruthy();
  });

  it('test util randomNumber', () => {
    const randomNumber: number = Utils.randomNumber(1, 20);
    expect(randomNumber >= 1 && randomNumber <= 20).toBeTruthy();
  });

  it('test util randomString', () => {
    expect(Utils.randomString(10).length).toBe(10);
    expect(Utils.randomString(10, true).length).toBe(10);
  });

  it('should count mails', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentRef.instance;
    component.addEmail();
    component.onCount(1);
    expect(component.emailsCount).toBe(1);
  });
});
