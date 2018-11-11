import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EmailsEditorComponent } from './emails-editor.component';
import { EmailBlockComponent } from './email-block/email-block.component';

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

  it('should create invalid block', () => {
    fixture;
    component.addBlock('123');
    expect(component).toBeTruthy();
  });
});
