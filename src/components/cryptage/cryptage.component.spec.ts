import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptageComponent } from './cryptage.component';

describe('CryptageComponent', () => {
  let component: CryptageComponent;
  let fixture: ComponentFixture<CryptageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CryptageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
