import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {ProductService} from '../../../shared/services/product.service';
import { CategoriesService } from '../../../shared/services/categories.service';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {RouterLink} from '@angular/router';
import {Category} from '../../../shared/interfaces/category';
import {ProductsForLoopComponent} from '../../../shared/components/products-for-loop/products-for-loop.component';
import {Product, Subcategory} from '../../../shared/interfaces/product';
import {SubCategoriesService} from '../../../shared/services/sub-categories.service';
import {NgClass} from '@angular/common';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-categories',
  imports: [
    CarouselModule,
    ProductsForLoopComponent,
    NgClass,

  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{
  private _categoriesService:CategoriesService=inject(CategoriesService);
  private _productService:ProductService=inject(ProductService);
  private _subCategoriesService:SubCategoriesService=inject(SubCategoriesService);
  private destroyRef:DestroyRef = inject(DestroyRef);
  categories!:Category[];
  products!:Product[];
  productsByCategory!:Product[];
  productsBySubCategory!:Product[];
  subCategories:Subcategory[]=[];
  selectedCategoriesIds:string[]=[];
  selectedSubCategoriesIds:string[]=[];
  showFilter:boolean = false;

  ngOnInit(){
    this.getAllCategories()
    this.getAllProducts()
  }

  getAllCategories(){
    this._categoriesService.getAllCategories().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res)=>{
        this.categories = res.data;
      }
    })
  }

  getSubCategory(id:string){
    this._subCategoriesService.getAllSubCategoriesOnCategory(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res)=>{
        this.subCategories.push(...res.data);
      }
    })
  }

  getAllProducts(){
    this._productService.getAllProducts().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res)=>{

        this.products = res.data;
        this.productsByCategory = res.data;
      }
    })
  }

  choseByCategory(id:string){
    this.PushSubCategories(id)
    if(this.selectedCategoriesIds.length === 0){
      this.selectedCategoriesIds.push(id)
      this.products = this.productsByCategory.filter(product =>  this.selectedCategoriesIds.includes(product.category._id))
      this.productsBySubCategory = this.products;
    }
    else if(!this.selectedCategoriesIds.includes(id)){

      this.selectedCategoriesIds.push(id)
      this.products = this.productsByCategory.filter(product =>  this.selectedCategoriesIds.includes(product.category._id))
      this.productsBySubCategory = this.products;
    }else {
      this.selectedCategoriesIds = this.selectedCategoriesIds.filter(cateID =>  cateID !== id)
      if(this.selectedCategoriesIds.length === 0){
        this.products = this.productsByCategory
        this.productsBySubCategory = this.products;
      }else {
        this.products = this.productsByCategory.filter(product =>  this.selectedCategoriesIds.includes(product.category._id))
        this.productsBySubCategory = this.products;

      }
    }
  }

  choseBySubCategory(id:string){
    if(this.selectedSubCategoriesIds.length === 0){
      this.selectedSubCategoriesIds.push(id)
      this.products = this.products.filter(product => product.subcategory.filter(subCategory =>  this.selectedSubCategoriesIds.includes(subCategory._id)))
    }
    else if(!this.selectedSubCategoriesIds.includes(id)){
      this.selectedSubCategoriesIds.push(id)
      this.products = this.products.filter(product => product.subcategory.filter(subCategory =>  this.selectedSubCategoriesIds.includes(subCategory._id)))
    }else {
      this.selectedSubCategoriesIds = this.selectedSubCategoriesIds.filter(cateID =>  cateID !== id)

      if(this.selectedSubCategoriesIds.length === 0){
        this.products = this.productsBySubCategory
      }else {
        this.products = this.products.filter(product => product.subcategory.filter(subCategory =>  this.selectedSubCategoriesIds.includes(subCategory._id)))
      }
    }

  }

  PushSubCategories(id:string){
    let founded = false;
    if(this.subCategories.length > 0 ){
      this.subCategories = this.subCategories.filter((subCategory:Subcategory)=> {
        if(subCategory.category === id){
          founded = true;
        }
        return subCategory.category !== id
      })
      if(!founded){
        this.getSubCategory(id)
        founded = false;
      }
    }else {
      founded = false;
      this.getSubCategory(id)
    }
  }
}
