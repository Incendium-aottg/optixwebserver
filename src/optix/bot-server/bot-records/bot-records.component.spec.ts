import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotRecordsComponent } from './bot-records.component';

describe('BotRecordsComponent', () => {
  let component: BotRecordsComponent;
  let fixture: ComponentFixture<BotRecordsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BotRecordsComponent]
    });
    fixture = TestBed.createComponent(BotRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
