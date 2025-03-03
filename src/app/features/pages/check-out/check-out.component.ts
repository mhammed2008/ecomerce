import {Component, DestroyRef, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {OrdersService} from '../../../shared/services/orders.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CartService} from '../../../shared/services/cart.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-check-out',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.scss'
})
export class CheckOutComponent implements OnInit {
  private _ordersService:OrdersService = inject(OrdersService)
  private cart:CartService = inject(CartService)
  private router:ActivatedRoute = inject(ActivatedRoute)
  private routes:Router = inject(Router);
  private toastr = inject(ToastrService)
  private destroyRef:DestroyRef = inject(DestroyRef);
  cartId!:string;
  submitType!:string;
  spinner!: HTMLButtonElement;
  @ViewChild('checkOutBtn')checkOutBtn!:ElementRef;
  @ViewChild('checkOnlineBtn')checkOnlineBtn!:ElementRef;

  ngOnInit() {
    this.cartId = this.router.snapshot.paramMap.get('cartId')!;
  }
  checkOutForm: FormGroup = new FormGroup({
    city: new FormControl('dfs', [Validators.required]),
    phone: new FormControl('01204270588', [Validators.required,Validators.pattern('01(2|0|5)[0-9]{8,8}')]),
    details: new FormControl('jkljkl', [Validators.required,Validators.minLength(5)]),
  });

  checkOut(submitType: string ) {

    if(this.checkOutForm.invalid){
      this.checkOutForm.markAllAsTouched()
    }else {

      if (submitType == 'checkOut') {
        let spinner = this.checkOutBtn.nativeElement;
        spinner.disabled = true;
        console.log('success');
        this._ordersService.createCashOrder(this.cartId, this.checkOutForm.value).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
          next: result => {
            console.log(result);
            if (result.status === 'success') {
              this.routes.navigate(['/allorders']);
              this.cart.updateCartNavbar(0);
            }
          },
          error: error => {
            console.log(error);
            this.toastr.error('your order has failed please try again.');
          },
          complete: () => {spinner.disabled=false;}
        })
      }else {
        let spinner= this.checkOnlineBtn.nativeElement;
        spinner.disabled = true;
        this._ordersService.CheckoutSession(this.cartId,this.checkOutForm.value).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
          next: result => {
            console.log(result);
            window.location.assign(result.session.url);
            this.cart.updateCartNavbar(0);
          },
          error: error => {
            console.log(error);
            this.toastr.error('your order has failed please try again.');
          },
          complete: () => {spinner.disabled=false;}
        })
      }
    }
  }
}
