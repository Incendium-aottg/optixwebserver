import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotMapsComponent } from './bot-maps.component';

describe('BotMapsComponent', () => {
  let component: BotMapsComponent;
  let fixture: ComponentFixture<BotMapsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BotMapsComponent]
    });
    fixture = TestBed.createComponent(BotMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
