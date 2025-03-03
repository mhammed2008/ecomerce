import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartLoadingProductComponent } from './cart-loading-product.component';

describe('CartLoadingProductComponent', () => {
  let component: CartLoadingProductComponent;
  let fixture: ComponentFixture<CartLoadingProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartLoadingProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartLoadingProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
