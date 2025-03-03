import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {ProductsForLoopComponent} from "../../../shared/components/products-for-loop/products-for-loop.component";
import {ProductService} from '../../../shared/services/product.service';
import {Brand, Product, Subcategory} from '../../../shared/interfaces/product';
import {BrandsService} from '../../../shared/services/brand.service';
import {NgClass} from '@angular/common';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-brands',
  imports: [
    ProductsForLoopComponent,
    NgClass
  ],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {

  private _productService:ProductService=inject(ProductService);
  private _brandsService:BrandsService=inject(BrandsService);
  private destroyRef:DestroyRef = inject(DestroyRef);
  brands!:Brand[];
  products!:Product[];
  productsByBrand!:Product[];
  selectedBrandsIds:string[]=[];
  showFilter:boolean = false;

  ngOnInit(){
    this.getAllBrands()
    this.getAllProducts()
  }

  getAllBrands(){
    this._brandsService.getAllBrands().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res)=>{
        this.brands = res.data;
        console.log(res.data);
      }
    })
  }


  getAllProducts(){
    this._productService.getAllProducts().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res)=>{

        this.products = res.data;
        this.productsByBrand = res.data;
      }
    })
  }

  choseByBrand(id:string){

    if(this.selectedBrandsIds.length === 0){
      this.selectedBrandsIds.push(id)
      this.products = this.productsByBrand.filter(product =>  this.selectedBrandsIds.includes(product.brand._id))
    }
    else if(!this.selectedBrandsIds.includes(id)){
      this.selectedBrandsIds.push(id)
      this.products = this.productsByBrand.filter(product =>  this.selectedBrandsIds.includes(product.brand._id))
    }else {
      this.selectedBrandsIds = this.selectedBrandsIds.filter(cateID =>  cateID !== id)
      if(this.selectedBrandsIds.length === 0){
        this.products = this.productsByBrand
      }else {
        this.products = this.productsByBrand.filter(product =>  this.selectedBrandsIds.includes(product.brand._id))

      }
    }
  }


}
