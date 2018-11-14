import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule }   from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { EmailsEditorComponent } from './emails-editor.component';
import { EmailBlockComponent } from './email-block/email-block.component';
import * as $ from 'jquery';

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
    fixture = TestBed.createComponent(EmailsEditorComponent);
    component.addBlock('123, 321');
    fixture.detectChanges();
    component.addBlock(',,123, 321;');
    fixture.detectChanges();
    component.addBlock('asd@3gdf.er');
    fixture.detectChanges();
    expect(component.blocks.length === 2).toBeTruthy();
  });

  it('should delete block', async(() => {
    fixture = TestBed.createComponent(EmailsEditorComponent);
    component.addBlock('123');
    fixture.detectChanges();
    // fixture.
    const created = component.blocks.length === 1;
    // fixture.debugElement.nativeElement.querySelector('email-block').querySelector('.icon-x').click();
    // fixture.detectChanges();
    // setTimeout(() => {
    //   fixture.detectChanges();
    //   fixture.debugElement.nativeElement.querySelector('email-block').querySelector('.icon-x').click();
    //   expect(created && component.blocks.length === 0).toBeTruthy();
    // }, 2000)

    //fixture.componentRef.instance.addEmail();
    fixture.whenStable().then(() => {
      // after something in the component changes, you should detect changes
      let block = fixture.debugElement.query(By.css('.input-form'));
      fixture.detectChanges();
      block = fixture.debugElement.query(By.css('.input-form'));
      expect(block.children.length).toBeGreaterThan(2);
      // everything else in the beforeEach needs to be done here.
      let closeIcon = fixture.debugElement.nativeElement.querySelector('email-block').querySelector('.icon-x').click();
      // ...
    })

    fixture.detectChanges();
    // expect(created && component.blocks.length === 0).toBeTruthy();
  }));

  it('should parse pasted blocks', () => {
    fixture = TestBed.createComponent(EmailsEditorComponent);
    // const editor = fixture.componentInstance;
    const textarea = fixture.debugElement.nativeElement.querySelector('textarea');
    textarea.value = '123';
    // $(textarea).trigger('paste');
    // textarea.dispatchEvent(new Event('paste', { } ));
    component.onPaste(new ClipboardEvent('paste', {
      dataType: 'text/plain'
      // data: '123, 321; ,, sfsadf;; sfd@ds.rewe;;'
    }));
    fixture.detectChanges();
    expect(component.blocks.length === 1).toBeTruthy();
  });
});
