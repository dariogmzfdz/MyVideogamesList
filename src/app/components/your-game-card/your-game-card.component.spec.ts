import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourGameCardComponent } from './your-game-card.component';

describe('YourGameCardComponent', () => {
  let component: YourGameCardComponent;
  let fixture: ComponentFixture<YourGameCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourGameCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourGameCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
