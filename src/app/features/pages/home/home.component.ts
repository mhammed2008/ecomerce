import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {CarouselModule, OwlOptions} from 'ngx-owl-carousel-o';
import {CategorySliderComponent} from './components/category-slider/category-slider.component';
import {ProductCardComponent} from '../../../shared/components/product-card/product-card.component';
import {ProductsForLoopComponent} from '../../../shared/components/products-for-loop/products-for-loop.component';
import {HeaderComponent} from './components/header/header.component';
import {ProductService} from '../../../shared/services/product.service';
import {Product} from '../../../shared/interfaces/product';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-home',
  imports: [
    CarouselModule,
    CategorySliderComponent,
    ProductsForLoopComponent,
    HeaderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  private _productService:ProductService=inject(ProductService)
  private destroyRef:DestroyRef = inject(DestroyRef);
  products!:Product[];


  ngOnInit() {
    this.getAllProducts()
  }

  getAllProducts(){
    this._productService.getAllProducts().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (data) => {
        this.products = data.data;
        this.products.reverse();
      }
    })
  }

}
