import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {CarouselModule, OwlOptions} from "ngx-owl-carousel-o";
import {CategoriesService} from '../../../../../shared/services/categories.service';
import {Category} from '../../../../../shared/interfaces/category';
import {RouterLink} from '@angular/router';
import {
  CategorySliderLoadComponent
} from '../../../../../shared/components/category-slider-load/category-slider-load.component';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-category-slider',
  imports: [
    CarouselModule,
    RouterLink,
    CategorySliderLoadComponent
  ],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.scss'
})
export class CategorySliderComponent implements OnInit{
  private destroyRef:DestroyRef = inject(DestroyRef);
  private _categoriesService:CategoriesService = inject(CategoriesService);

  categories!:Category[];

  customOptions: OwlOptions = {
    center: true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 300,
    autoplay:true,
    autoplayTimeout:1500,
    autoplayHoverPause:false,
    responsive: {
      0:{
        items:2
      },
      400:{
        items:3
      },
      510:{
        items:4
      },
      710:{
        items:5
      },
      810:{
        items:6
      },
      950:{
        items:7
      }
    }
  };


  ngOnInit() {
    this.getCategories()
  }

  getCategories(){
    this._categoriesService.getAllCategories().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: data => {
        this.categories = data.data;
      }
    })
  }

}
