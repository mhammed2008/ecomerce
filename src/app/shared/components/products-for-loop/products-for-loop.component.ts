import {Component, DestroyRef, inject, Input, OnChanges, OnInit, signal, SimpleChanges} from '@angular/core';
import {ProductCardComponent} from "../product-card/product-card.component";
import {ProductService} from '../../services/product.service';
import {Product} from '../../interfaces/product';
import {LoadingProductComponent} from '../loading-product/loading-product.component';
import {CartService} from '../../services/cart.service';
import {WishListService} from '../../services/wishList.service';
import {ToastrService} from 'ngx-toastr';
import {CartResponse} from '../../interfaces/cart-response';
import {ProductDialogComponent} from '../product-dialog/product-dialog.component';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-products-for-loop',
  imports: [
    ProductCardComponent,
    LoadingProductComponent,
    ProductDialogComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './products-for-loop.component.html',
  styleUrl: './products-for-loop.component.scss'
})
export class ProductsForLoopComponent  implements OnInit , OnChanges {

  @Input({required:true}) products!:Product[];

  private readonly _cartService:CartService=inject(CartService);
  private readonly _wishListService:WishListService=inject(WishListService);
  private _toastr=inject(ToastrService);
  private destroyRef:DestroyRef = inject(DestroyRef);
  spinner!:HTMLButtonElement;
  load:boolean = false;
  showDialog:boolean = false;
  productIdForDialog!:string;
  wishListProductsId!:string[];
  filterProducts:Product[] = [];
  searchForm:FormGroup=new FormGroup({
    search: new FormControl(''),
  });

  ngOnChanges(changes: SimpleChanges) {
    this.filterProducts = changes['products'].currentValue
  }

  ngOnInit() {
    this.getWishListProductsId()
  }
  getWishListProductsId(){
    this._wishListService.getWishList().subscribe({
      next: data => {
        this.wishListProductsId = data.data.map((product:Product) => product.id);
      },
      error: err => {
        console.log(err)
      },
      complete: () => {
      }
    })
  }


  loading(btn:HTMLButtonElement){
      this.spinner = btn;
  }

  addToCart(id:string ){
    let spinner:HTMLButtonElement = this.spinner;
    spinner.disabled = true;
    this._cartService.addProductToCart(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res:CartResponse) => {
        this._cartService.updateCartNavbar(res)
        this._toastr.success(res.message);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        spinner.disabled= false;
      }
    })
  }

  addProductToWishList(id:string){
    let spinner:HTMLButtonElement = this.spinner;
    spinner.disabled = true;
    this._wishListService.addProductToWishList(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this._toastr.success(res.message);
        this.getWishListProductsId()

      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        spinner.disabled= false;
      }
    })
  }

  Dialog(product:string){
    if (product){
      this.showDialog = true;
      this.productIdForDialog=product;
    }
  }
  closeDialog(showDialog:boolean){
    this.showDialog = showDialog;
  }
  searchFilter(){

    let search:string=this.searchForm.controls['search'].value.toLowerCase();
    let filteredProducts:Product[]=[];

    this.filterProducts.map((product:Product) => {
      if(product.title.toLowerCase().includes(search) || product.category.name.toLowerCase().includes(search) || product.brand.name.toLowerCase().includes(search) || product.description.toLowerCase().includes(search)){
        filteredProducts.push(product);
      }
    });
    this.products = filteredProducts;

  }


}
