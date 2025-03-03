import {Component, Input, Output, EventEmitter, inject, OnInit} from '@angular/core';
import {RatingComponent} from '../rating/rating.component';
import {Product} from '../../interfaces/product';
import {Router, RouterLink} from '@angular/router';

import {CurrencyPipe} from '@angular/common';
import {ProductDialogComponent} from '../product-dialog/product-dialog.component';





@Component({
  selector: 'app-product-card',
  imports: [
    RatingComponent,
    RouterLink,
    CurrencyPipe,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent{
  @Input({required: true}) product!:Product;
  @Input({required: true}) productIsInsideWishList!:boolean;
  @Input() xMerck:boolean=false
  @Output() fireAddToCart:EventEmitter<string> = new EventEmitter();
  @Output() load:EventEmitter<HTMLButtonElement> = new EventEmitter();
  @Output() fireAddToWishList:EventEmitter<string> = new EventEmitter();
  @Output() removeFromWishList:EventEmitter<string> = new EventEmitter();
  @Output() showDialog:EventEmitter<string> = new EventEmitter();



  addToCart(id:string , spinner:HTMLButtonElement ){
    this.load.emit(spinner);
    this.fireAddToCart.emit(id );
  }
  addProductToWishList(id:string, spinner:HTMLButtonElement){
    this.load.emit(spinner);
    this.fireAddToWishList.emit(id)
  }

  RemoveFromWishList(id:string , spinner:HTMLButtonElement){
    this.load.emit(spinner);
    this.removeFromWishList.emit(id)
  }
  Dialog(show:string){
    this.showDialog.emit(show);
  }


}
