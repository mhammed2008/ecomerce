import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {Product} from '../../interfaces/product';
import {ProductService} from '../../services/product.service';
import {ToastrService} from 'ngx-toastr';
import {ProductComponent} from '../../../features/pages/product/product.component';
import {CategoriesService} from '../../services/categories.service';
import {CartService} from '../../services/cart.service';
import {WishListService} from '../../services/wishList.service';
import {CarouselModule, OwlOptions} from 'ngx-owl-carousel-o';
import {CurrencyPipe, NgClass} from '@angular/common';
import {RatingComponent} from '../rating/rating.component';
import {LoadingComponent} from '../loading/loading.component';
import {SubHeaderComponent} from '../sub-header/sub-header.component';
import {RouterLink} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-dialog',
  imports: [
    CarouselModule,
    CurrencyPipe,
    RatingComponent,
    NgClass,
    LoadingComponent,
    RouterLink,
  ],
  templateUrl: './product-dialog.component.html',
  styleUrl: './product-dialog.component.scss'
})
export class ProductDialogComponent implements OnChanges{
  @Input({required:true}) show!: boolean;
  @Input({required:true}) productId!: string;
  @Output() closeDialog:EventEmitter<boolean> =new EventEmitter();
  private _productService:ProductService=inject(ProductService);
  private _cartService:CartService=inject(CartService);
  private _wishListService:WishListService=inject(WishListService);
  private toastr:ToastrService=inject(ToastrService);
  private destroyRef:DestroyRef = inject(DestroyRef);
  product!:Product;
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

  }

  Dialog():void{
    this.closeDialog.emit(false);
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['productId'].currentValue){
      console.log('im am w')
      this.getSingleProduct(this.productId)
    }
    console.log(changes)
  }


  getSingleProduct(id:string){
    this.getWishListProductsId(id)
    this._productService.getSpecificProduct(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: product => {
        console.log(product);
        this.product = product.data;
        this.mainImage = product.data.imageCover;
        this.getWishListProductsId(id)

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

}
