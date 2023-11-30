import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordTablePageComponent } from './record-table-page.component';

describe('RecordTablePageComponent', () => {
  let component: RecordTablePageComponent;
  let fixture: ComponentFixture<RecordTablePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecordTablePageComponent]
    });
    fixture = TestBed.createComponent(RecordTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
