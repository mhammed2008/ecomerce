import {Component, DestroyRef, inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CurrencyPipe, NgClass} from '@angular/common';
import {RatingComponent} from '../../../shared/components/rating/rating.component';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ProductService} from '../../../shared/services/product.service';
import {CarouselModule, OwlOptions} from 'ngx-owl-carousel-o';
import {Product} from '../../../shared/interfaces/product';
import {CartService} from '../../../shared/services/cart.service';
import {ToastrService} from 'ngx-toastr';
import {WishListService} from '../../../shared/services/wishList.service';
import {SubHeaderComponent} from '../../../shared/components/sub-header/sub-header.component';
import {LoadingComponent} from '../../../shared/components/loading/loading.component';
import {ProductsForLoopComponent} from '../../../shared/components/products-for-loop/products-for-loop.component';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-product',
  imports: [CurrencyPipe, RatingComponent, CarouselModule, SubHeaderComponent, LoadingComponent, NgClass, ProductsForLoopComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{
  private route=inject(ActivatedRoute);
  private _productService:ProductService=inject(ProductService);
  private _cartService:CartService=inject(CartService);
  private _wishListService:WishListService=inject(WishListService);
  private toastr:ToastrService=inject(ToastrService);
  private destroyRef:DestroyRef = inject(DestroyRef);
  product!:Product;
  products:Product[] = [];
  mainImage!:string;
  wishListProducts!:boolean;

  customOptions: OwlOptions = {
    center: true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:false,
    responsive: {
      0:{
        items: 2,
      },
      400:{
        items: 3,
      },
      450:{
        items: 4,
      }
    }

  };

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.getSingleProduct(id)
  }

  getSingleProduct(id:string){
    this.getWishListProductsId(id)
    this._productService.getSpecificProduct(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: res => {
        console.log(res);
        this.product = res.data;
        this.mainImage = res.data.imageCover;
        this.getWishListProductsId(id)
        this.getProductsByCategoryId(this.product.category._id)
      }
    })
  }
  addProductToCart(id:string,btn:HTMLButtonElement){
    btn.disabled = true;
    this._cartService.addProductToCart(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: res => {
        this.toastr.success('Product Added',res.message);
        this._cartService.updateCartNavbar(res)
      },
      error: err => {
        console.log(err)
      },
      complete:()=>{
        btn.disabled = false;
      }
    })
  }

  addProductToWishList(id:string,btn:HTMLButtonElement){
    btn.disabled = true;
    this._wishListService.addProductToWishList(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: res => {
        this.toastr.success(res.message);
      },
      error: err => {
        console.log(err)
      },
      complete:()=>{
        btn.disabled = false;
      }
    })
  }
  changeMainImage(image:string){
    this.mainImage = image;
  }

  getWishListProductsId(id:string){
    this._wishListService.getWishList().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: data => {
        data = data.data.map((product:Product) => product.id === id);
        this.wishListProducts = data.includes(true)
      },
      error: err => {
        console.log(err)
      },
      complete: () => {
      }
    })
  }
  getProductsByCategoryId(id:string){
    this._productService.getAllProducts().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: data => {
        data.data.map((product:Product) => {
          if (product.category._id === id){
            this.products.push(product);
          }
        });
      },
      error: err => {
        console.log(err)
      },
      complete: () => {}
    })
  }
}
