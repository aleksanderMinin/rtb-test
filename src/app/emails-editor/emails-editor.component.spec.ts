import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { FormsModule }   from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';

import { EmailsEditorComponent } from './emails-editor.component';
import { EmailBlockComponent } from './email-block/email-block.component';

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
    expect(component.blocks.length).toBe(2);
  });

  it('should parse pasted blocks', fakeAsync(() => {
    const textarea = fixture.debugElement.nativeElement.querySelector('textarea');
    textarea.value = '123, 321,,;; asd@3gdf.er';
    const event = {
      target: textarea
    };
    component.onPaste(event as ClipboardEvent);
    tick(60);
    expect(component.blocks.length).toBe(3);
    tick(150);
  }));

  it('should response input', () => {
    const testString = '2@1.3,,2;;';

    for (let i = 0; i <= testString.length - 1; i++) {
      const event = new KeyboardEvent('keypress', {
        key: testString.slice(i, i + 1)
      });
      component.inputEvent(event);
      component.inputEmail = component.inputEmail.concat(event.key);
    }
    expect(component.blocks.length).toBe(2);

    component.inputEmail = 'focusout@event.org'
    const focusEvent = new FocusEvent('focusout');
    component.inputEvent(focusEvent);

    expect(component.blocks.length).toBe(3);
  });

  it('should delete block', () => {
    const testString = '1@2.3';
    component.addBlock(testString);
    expect(component.blocks.length).toBe(1);
    component.onDeleted(new Block(testString));
    expect(component.blocks.length).toBe(0);
  });
});
