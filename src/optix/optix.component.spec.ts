import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OptixComponent } from './optix.component';

describe('OptixComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [OptixComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(OptixComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'optixwebserver'`, () => {
    const fixture = TestBed.createComponent(OptixComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('optixwebserver');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(OptixComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('optixwebserver app is running!');
  });
});
