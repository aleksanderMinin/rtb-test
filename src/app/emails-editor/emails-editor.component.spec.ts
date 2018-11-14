import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
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
    fixture.componentInstance.addBlock('123, 321');
    fixture.detectChanges();
    fixture.componentInstance.addBlock(',,123, 321;');
    fixture.detectChanges();
    fixture.componentInstance.addBlock('asd@3gdf.er');
    fixture.detectChanges();
    expect(fixture.componentInstance.blocks.length === 2).toBeTruthy();
  });

  it('should delete block', () => {
    fixture = TestBed.createComponent(EmailsEditorComponent);
    const editor = fixture.componentInstance;
    editor.addBlock('123');
    fixture.detectChanges();
    const created = editor.blocks.length === 1;
    fixture.debugElement.nativeElement.querySelector('email-block').querySelector('.icon-x').click();
    fixture.detectChanges();
    expect(created && editor.blocks.length === 0).toBeTruthy();
  });

  it('should parse pasted blocks', () => {
    fixture = TestBed.createComponent(EmailsEditorComponent);
    const editor = fixture.componentInstance;
    const textarea = fixture.debugElement.nativeElement.querySelector('textarea');
    textarea.value = '123';
    $(textarea).trigger('paste');
    // textarea.dispatchEvent(new Event('paste', { } ));
    fixture.detectChanges();
    expect(editor.blocks.length === 1).toBeTruthy();
  });
});
