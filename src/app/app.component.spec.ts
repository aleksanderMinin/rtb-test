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
    fixture.componentRef.instance.getEmailsCount();
    fixture.componentRef.instance.addEmail();
    fixture.componentRef.instance.getEmailsCount();
    fixture.componentRef.instance.addEmail();
    fixture.componentRef.instance.getEmailsCount();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('emails-editor')).toBeTruthy();
  });

  it('test util randomNumber', () => {
    let randomNumber: number;
    let greater1Less20: boolean = true;
    for (let i = 0; i < 20; i++) {
      randomNumber = Utils.randomNumber(1, 20);
      greater1Less20 = randomNumber >= 1 && randomNumber <= 20 && greater1Less20;
    }

    expect(greater1Less20).toBeTruthy();
  });

  it('test util randomString', () => {
    expect(Utils.randomString(10).length === 10).toBeTruthy();
  });

  it('should count mails', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentRef.instance.addEmail();
    fixture.componentRef.instance.onCount(1);
    expect(this.emailsCount === 1).toBeTruthy();
  });
});
