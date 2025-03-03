import {Component, DestroyRef, inject, OnDestroy, OnInit} from '@angular/core';
import {ProductsForLoopComponent} from '../../../shared/components/products-for-loop/products-for-loop.component';
import {ProductService} from '../../../shared/services/product.service';
import {Product} from '../../../shared/interfaces/product';
import {NgClass} from '@angular/common';
import {takeUntil} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-products',
  imports: [
    ProductsForLoopComponent,
    NgClass
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit  {
  private  _productService:ProductService=inject(ProductService);
  private destroyRef:DestroyRef = inject(DestroyRef);
  products!:Product[];
  currentPage!:number;
  nextPage!:number;

  ngOnInit() {
    this.getAllProducts()
  }
  getAllProducts() {
    this._productService.getAllProducts().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: data => {
        console.log(data);
        this.currentPage = data.metadata.currentPage;
        this.nextPage = data.metadata.nextPage;
        this.products = data.data;
      }
    })
  }
  pagination(page:number , btn:HTMLButtonElement) {
    btn.disabled = true;

    this._productService.getProductPage(page).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: data => {
        console.log(data);
        this.currentPage = data.metadata.currentPage;
        this.products = data.data;
        scrollTo(0,0)
        btn.disabled = false;

      }
    })
  }
}
