import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Order} from '../../../shared/interfaces/order';
import {OrdersService} from '../../../shared/services/orders.service';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import {CurrencyPipe, DatePipe, NgClass} from '@angular/common';
import {ProductDialogComponent} from '../../../shared/components/product-dialog/product-dialog.component';
import {Product} from '../../../shared/interfaces/product';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {LoadingProductComponent} from '../../../shared/components/loading-product/loading-product.component';

@Component({
  selector: 'app-orders',
  imports: [

    CurrencyPipe,
    DatePipe,
    ProductDialogComponent,
    LoadingProductComponent
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  private _ordersService:OrdersService=inject(OrdersService)
  private _authService: AuthService = inject(AuthService)
  private _toastr:ToastrService = inject(ToastrService)
  private destroyRef:DestroyRef = inject(DestroyRef);
  orders!:Order[];
  showDialog:boolean=false;
  DialogProduct!:string;

  ngOnInit() {
    this.getALLOrders()
  }

  getALLOrders() {
    let userId: string;
    this._authService.isLoggedIn()
    this._authService.userData.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: res => {
        userId= res.id
      }
    })
    this._ordersService.getUserOrders(userId!).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next:(res:Order[])=> {
        this.orders = res.reverse()
      },
      error:(err) => {
        this._toastr.error('Something went wrong. Please try to refresh the page');
      }

    })
  }

  ShowDialog(product:string) {
    this.DialogProduct = product;
    this.showDialog = true;
  }
  CloseDialog(showDialog:boolean) {
    this.DialogProduct = ' ';
    this.showDialog = showDialog;
  }

}
