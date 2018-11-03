import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { EmailBlockComponent } from './email-block.component';
import { Block } from '../block';

describe('EmailBlockComponent', () => {
  let component: EmailBlockComponent;
  let fixture: ComponentFixture<EmailBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailBlockComponent ],
      imports: [ FormsModule,
        BrowserModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.block = new Block('test');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should delete', () => {
    component.block = new Block('test');
    fixture.detectChanges();
    component.delete();
    expect(component).toBeTruthy();
  });
});
