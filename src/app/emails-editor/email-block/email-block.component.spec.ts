import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailBlockComponent } from './email-block.component';

describe('EmailBlockComponent', () => {
  let component: EmailBlockComponent;
  let fixture: ComponentFixture<EmailBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
