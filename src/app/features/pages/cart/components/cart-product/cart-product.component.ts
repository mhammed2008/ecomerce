import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CartItem} from '../../../../../shared/interfaces/cart-item';
import {RouterLink} from '@angular/router';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-cart-product',
  imports: [
    CurrencyPipe
  ],
  templateUrl: './cart-product.component.html',
  styleUrl: './cart-product.component.scss'
})
export class CartProductComponent {
  @Input({required:true}) product!: CartItem;
  @Output() fireUpdateCartQuantity:EventEmitter<number> = new EventEmitter<number>();
  @Output() fireUpdateCartId:EventEmitter<string> = new EventEmitter<string>();
  @Output() fireDeleteCartItem:EventEmitter<string>= new EventEmitter<string>();
  @Output() load:EventEmitter<HTMLButtonElement> = new EventEmitter<HTMLButtonElement>();
  @Output() showDialog:EventEmitter<string> = new EventEmitter();

  updateCount(productId:string,count:number){
    this.fireUpdateCartQuantity.emit(count);
    this.fireUpdateCartId.emit(productId);
  }
  removeItem(productId:string,load:HTMLButtonElement){
    this.load.emit(load);
    this.fireDeleteCartItem.emit(productId);
  }

  Dialog(show:string){
    this.showDialog.emit(show);
  }

}
