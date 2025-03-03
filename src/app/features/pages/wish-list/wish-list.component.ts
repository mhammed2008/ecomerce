import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {SubHeaderComponent} from '../../../shared/components/sub-header/sub-header.component';
import {WishListService} from '../../../shared/services/wishList.service';
import {Product} from '../../../shared/interfaces/product';
import {LoadingProductComponent} from '../../../shared/components/loading-product/loading-product.component';
import {ProductCardComponent} from '../../../shared/components/product-card/product-card.component';
import {CartResponse} from '../../../shared/interfaces/cart-response';
import {CartService} from '../../../shared/services/cart.service';
import {ToastrService} from 'ngx-toastr';
import {RouterLink} from '@angular/router';
import {ProductDialogComponent} from '../../../shared/components/product-dialog/product-dialog.component';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-wish-list',
  imports: [
    SubHeaderComponent,
    LoadingProductComponent,
    ProductCardComponent,
    RouterLink,
    ProductDialogComponent,
  ],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit{
  private readonly _wishListService:WishListService=inject(WishListService)
  private readonly _cartService:CartService=inject(CartService)
  private readonly _toastr:ToastrService=inject(ToastrService)
  private spinner!: HTMLButtonElement;
  private destroyRef:DestroyRef = inject(DestroyRef);
  products!:Product[];
  showDialog:boolean=false;
  productIdForDialog!:string;

  ngOnInit() {
    this.getAllWishListProducts()
  }
  getAllWishListProducts(message?:string){
    let spinner:HTMLButtonElement;
    if(message){
      spinner= this.spinner;
    }
    this._wishListService.getWishList().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: data => {
        this.products = data.data;
        console.log(this.products);
        message ? this._toastr.success(message):null;
      },
      error: err => {
        console.log(err)
      },
      complete: () => {
        message?spinner.disabled = false:null;
      }
    })
  }

  loading(btn:HTMLButtonElement){
    this.spinner = btn;
  }

  addToCart(id:string ){
    let spinner:HTMLButtonElement = this.spinner
    spinner.disabled = true;
    this._cartService.addProductToCart(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res:CartResponse) => {
        this._cartService.updateCartNavbar(res)
        let message:string=res.message!;
        this._wishListService.deleteProductFromWishList(id).subscribe({
          next: () => {
            this.getAllWishListProducts(message)
          }
        })
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {}
    })

  }

  removeFromWishList(id:string){
    let spinner:HTMLButtonElement = this.spinner
    spinner.disabled = true;
    this._wishListService.deleteProductFromWishList(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.getAllWishListProducts(res.message)
      }
    })
  }
  Dialog(id:string){
    this.productIdForDialog=id;
    this.showDialog=true;
  }
  closeDialog(show:boolean){
    this.showDialog=show;
  }
}
