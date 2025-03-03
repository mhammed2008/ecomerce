import {afterNextRender, Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {CartService} from '../../../shared/services/cart.service';
import {CartItem} from '../../../shared/interfaces/cart-item';
import {ToastrService} from 'ngx-toastr';
import {RouterLink} from '@angular/router';
import {CartResponse} from '../../../shared/interfaces/cart-response';
import {CurrencyPipe} from "@angular/common";
import {CartProductComponent} from './components/cart-product/cart-product.component';
import {CartLoadingProductComponent} from './components/cart-loading-product/cart-loading-product.component';
import {ProductDialogComponent} from "../../../shared/components/product-dialog/product-dialog.component";
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-cart',
    imports: [
        RouterLink,
        CurrencyPipe,
        CartProductComponent,
        CartLoadingProductComponent,
        ProductDialogComponent
    ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})

export class CartComponent implements OnInit{
  private _cartService=inject(CartService);
  private toastr=inject(ToastrService);
  private destroyRef:DestroyRef = inject(DestroyRef);

  products:CartItem[] | null = null;
  cartId!:string;
  numOfProductsInCart!:number;
  TotalCartPrice!:number;
  loading!:HTMLButtonElement;
  count!:number;
  showDialog:boolean=false;
  productIdForDialog!:string;

  ngOnInit() {
    this.getCart()
  }

  getCart(){
    this._cartService.getCart().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res:CartResponse) => {
        this.updateValue(res)
        console.log(this.products);
      }
    })
  }

  removeItem(itemId:string ){
    let deleteBtn:HTMLButtonElement = this.loading;
    deleteBtn.disabled = true;
    this._cartService.deleteProductFromCart(itemId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.updateValue(res)
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.toastr.success('Item deleted!');
        deleteBtn.disabled = false;

      }
    })
  }
  deleteAllCart(spinner:HTMLButtonElement){
    spinner.disabled = true;
    this._cartService.deleteAllCart().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res:CartResponse) => {
        let numOfCartItems={
            numOfCartItems: 0,
        }
        this.products=[]
        this._cartService.updateCartNavbar(numOfCartItems)
        this.toastr.success('All items deleted!');

      },
      error: (err) => {
        this.toastr.error('Error deleting the cart!');
      },
      complete: () => {
        spinner.disabled = false;
      }
    })
  }

  updateValue(res:any){
    this.products = res.data.products;
    this.cartId = res.cartId;
    this.numOfProductsInCart = res.numOfCartItems;
    this.TotalCartPrice = res.data.totalCartPrice;
    this._cartService.updateCartNavbar(res)
  }

  updateCount(productId:string){
    let count:number = this.count;
    this._cartService.updateProductQuantity(productId,`${count}`).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.updateValue(res)
        this.toastr.success('Item updated!');
      }
    })
  }
  Dialog(productId:string){
    this.productIdForDialog = productId;
    this.showDialog = true;
  }
  closeDialog(show:boolean){
    this.showDialog = show;
  }
}
