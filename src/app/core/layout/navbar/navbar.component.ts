import {Component, DestroyRef, ElementRef, HostListener, inject, OnInit, ViewChild} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {CartService} from '../../../shared/services/cart.service';
import {CartResponse} from '../../../shared/interfaces/cart-response';
import {ToastrService} from 'ngx-toastr';
import {jwtDecode} from 'jwt-decode';
import {FlowbiteService} from '../../../shared/services/flowbite.service';
import {AuthService} from '../../services/auth.service';
import {initFlowbite} from 'flowbite';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  private _cartService:CartService = inject(CartService);
  private toastr:ToastrService = inject(ToastrService);
  private _flowbiteService=inject(FlowbiteService);
  private _authService=inject(AuthService);
  private router = inject(Router);
  private destroyRef:DestroyRef = inject(DestroyRef);

  cartItems!:CartResponse;

  user!:{name: string};
  @ViewChild('nav') nav!:ElementRef ;




  ngOnInit() {
    initFlowbite()
    this.checkIfUserLoggedIn();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(){
    if(scrollY > 100){
      this.nav.nativeElement.classList = ' fixed z-[1000]  top-0 left-0 right-0 bg-white border-gray-200 dark:bg-gray-900 transition-all duration-500';

    }else {
      this.nav.nativeElement.classList= 'bg-white border-gray-200 dark:bg-gray-900 transition-all duration-500' ;
    }
  }

  getCart(){
    this._cartService.getCart().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res:CartResponse)=>{

        this._cartService.updateCartNavbar(res)
      }
    })
  }
  updateCart(){
    this._cartService.cartNav.subscribe({
      next: (res:CartResponse)=>{
        this.cartItems= res
      }
    })
  }
  checkIfUserLoggedIn(){
    this._authService.userData.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
          this.user = res;
          if(this.user){
            this.getCart()
            this.updateCart()
          }
      }
    });
  }
  logOut(){
    this._authService.logout()
    // this.checkIfUserLoggedIn()
    this.router.navigate(['/auth/login']);
  }

  flowbite(){
    this._flowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });
  }

}
