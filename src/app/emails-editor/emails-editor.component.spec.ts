import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { FormsModule }   from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';

import { EmailsEditorComponent } from './emails-editor.component';
import { EmailBlockComponent } from './email-block/email-block.component';
import * as $ from 'jquery';
import { Block } from './block';

describe('EmailsEditorComponent', () => {
  let component: EmailsEditorComponent;
  let fixture: ComponentFixture<EmailsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmailsEditorComponent,
        EmailBlockComponent
      ],
      imports: [
        FormsModule,
        BrowserModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add blocks', () => {
    component.addBlock('123, 321');
    component.addBlock(',,123, 321;');
    component.addBlock('asd@3gdf.er');
    expect(component.blocks.length === 2).toBeTruthy();
  });

  it('should parse pasted blocks', fakeAsync(() => {
    const textarea = fixture.debugElement.nativeElement.querySelector('textarea');
    textarea.value = '123, 321,,;; asd@3gdf.er';
    let event = {
      target: textarea
    };
    component.onPaste(event as ClipboardEvent);
    tick(60);
    expect(component.blocks.length === 3).toBeTruthy();
    tick(150);
  }));

  it('should response input', () => {
    const testString = '2@1.3,,2;;';

    for (let i=0; i<=testString.length; i++) {
      let event = { key: testString.slice(i, i + 1)};
      component.keyPress(event as KeyboardEvent);
      component.inputEmail = component.inputEmail.concat(event.key);
    }

    expect(component.blocks.length === 2).toBeTruthy();
  });

  it('should delete block', () => {
    const testString = '1@2.3';
    component.addBlock(testString);
    expect(component.blocks.length === 1).toBeTruthy();
    component.onDeleted(new Block(testString));

    expect(component.blocks.length === 0).toBeTruthy();
  });
});
